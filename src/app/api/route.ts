import { NextRequest } from "next/server";
import { searchStockPhotos } from './unsplash';
import { searchInDictionary } from './dictionary';

import { Functions } from "@/interface/interfaces";

const functions: Functions = {
  searchStockPhotos,
  searchInDictionary,
};

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 1,
  baseDelay: 100, // 1 second
  maxDelay: 1000, // 5 seconds
};

const retryConfigs: Record<keyof Functions, RetryConfig> = {
  searchStockPhotos: defaultRetryConfig,
  searchInDictionary: defaultRetryConfig,
};

async function handleRequest(request: NextRequest): Promise<Response> {
  const method = request.method;
  let body: any;

  if (method === "GET") {
    const url = new URL(request.url);
    body = {
      action: "api",
      fn: url.searchParams.get("fn"),
      args: url.searchParams.get("args") ? JSON.parse(url.searchParams.get("args")!) : [],
    };
  } else if (method === "POST") {
    body = await request.json();
    if (!body.action) {
      body.action = "api";
    }
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed",
        error: "Method not allowed",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 405,
      }
    );
  }

  switch (body.action) {
    case "api":
      return await handleApi(body);
    default: {
      console.log("Invalid action: ", body.action);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid action",
          error: "Invalid action",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  }
}
async function handleApi(body: any, retryCount = 0): Promise<Response> {
  console.log("\x1b[32mapi request received:\x1b[0m", body);
  try {
    const { fn, args } = body;
    if (!args) console.log("No args provided");
    if (!fn) {
      console.log("No function provided");
      return new Response(
        JSON.stringify({
          success: false,
          message: "No function provided",
          responseReq: body,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (typeof functions[fn as keyof Functions] === "function") {
      const response = await (
        functions[fn as keyof Functions] as (...args: any[]) => Promise<any>
      )(...args);
      response.responseReq = body;
      console.log("result received from function \"\x1b[35m" + fn + "\x1b[0m\":\x1b[32m", response.success + " \x1b[33m" + response.message + "\x1b[0m");

      if (!response.success) {
        const retryConfig = retryConfigs[fn as keyof Functions];
        if (retryCount < retryConfig.maxRetries) {
          const delay = Math.min(retryConfig.baseDelay * Math.pow(2, retryCount), retryConfig.maxDelay);
          console.log(`\x1b[36mError:\x1b[0m retrying in ${delay}ms, retry number: ${retryCount + 1}`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return handleApi(body, retryCount + 1);
        } else {
          console.log(`\x1b[31mError:\x1b[0m max retries reached, sending response`);
        }
      }

      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // Handle the case where the function does not exist or is not a function
      return new Response(
        JSON.stringify({
          success: false,
          message: "Function not found or not callable",
          responseReq: body,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  } catch (error) {
    // Handle any errors that occur during the function call
    console.error("Error handling api request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  console.log("GET request received");
  return await handleRequest(req);
}

export async function POST(req: NextRequest) {
  console.log("POST request received");
  return await handleRequest(req);
}
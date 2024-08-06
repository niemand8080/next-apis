interface Functions {
    searchStockPhotos: (
        query: string, 
        page: number, 
        per_page: number, 
        order_by: "latest" | "relevant", 
        color: "black_and_white" | "black" | "white" | "yellow" | "orange" | "red" | "purple" | "magenta" | "green" | "teal" | "blue" | "",
        orientation: "landscape" | "portrait" | "squarish" | ""
    ) => Promise<any>;
}

interface LoaderProps {
    visible: boolean;
    className?: string;
    children?: React.ReactNode;
  }

interface ActionButtonProps {
    children?: React.ReactNode;
    gradientBorder?: string;
    background?: string; 
    onClick?: () => void;
}

export type {
    Functions,
    LoaderProps,
    ActionButtonProps,
}
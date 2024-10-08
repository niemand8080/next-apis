interface Functions {
  searchStockPhotos: (
    query: string,
    page: number,
    per_page: number,
    order_by: "latest" | "relevant",
    color:
      | "black_and_white"
      | "black"
      | "white"
      | "yellow"
      | "orange"
      | "red"
      | "purple"
      | "magenta"
      | "green"
      | "teal"
      | "blue"
      | "",
    orientation: "landscape" | "portrait" | "squarish" | "",
  ) => Promise<any>;
  searchInDictionary: (word: string) => Promise<any>;
  getItemData: (itemId: string) => Promise<any>;
}

interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordProps {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
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

interface UnsplashImage {
  id: string;
  slug: string;
  alternative_slugs: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: {
    slug: string;
    title: string;
    index: number;
    type: string;
  }[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[]; // This could be further defined if we know the structure
  sponsorship: null | any; // This could be further defined if we know the structure when not null
  topic_submissions: {
    [key: string]: any; // This could be further defined if we know the structure
  };
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
  tags: {
    type: string;
    title: string;
    source?: any; // This could be further defined if we know the structure
  }[];
}

// The full response is an array of UnsplashImage objects
type UnsplashResponse = UnsplashImage[];

interface SelectProps {
  children: React.ReactNode;
  title?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type {
  Functions,
  LoaderProps,
  ActionButtonProps,
  UnsplashResponse,
  UnsplashImage,
  SelectProps,
  WordProps,
};

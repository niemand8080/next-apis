interface Functions {
    searchStockPhotos: (query: string) => Promise<any>;
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
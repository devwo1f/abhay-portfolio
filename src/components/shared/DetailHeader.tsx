import { Link } from "react-router-dom";

export const DetailHeader = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-xl font-mono font-medium hover:text-accent transition-colors flex items-center gap-2"
                >
                    <span className="text-accent">~/</span>
                    Dev Portfolio
                </Link>
                <div className="flex gap-4">
                    <Link to="/#projects" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
                    <Link to="/#blog" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                </div>
            </div>
        </header>
    );
};

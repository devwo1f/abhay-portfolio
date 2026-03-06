import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

interface RelatedItemProps {
    items: {
        slug: string;
        title: string;
        description: string;
        category?: string;
    }[];
    type: "blog" | "project";
}

export const RelatedItems = ({ items, type }: RelatedItemProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const basePath = type === 'blog' ? '/blog' : '/project';

    if (items.length === 0) return null;

    return (
        <div className="py-16 border-t border-border mt-16">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold">More {type === 'blog' ? 'Articles' : 'Projects'}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                        aria-label="Scroll left"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                        aria-label="Scroll right"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide flex-nowrap"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item) => (
                    <Link
                        key={item.slug}
                        to={`${basePath}/${item.slug}`}
                        className="block min-w-[300px] max-w-[350px] p-6 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors snap-start shrink-0"
                    >
                        {item.category && (
                            <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs rounded mb-3">
                                {item.category}
                            </span>
                        )}
                        <h4 className="text-lg font-medium mb-2 line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

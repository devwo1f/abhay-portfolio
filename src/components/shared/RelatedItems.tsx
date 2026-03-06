import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

interface RelatedItemProps {
    items: {
        slug: string;
        title: string;
        description: string;
        category?: string;
        cover?: string;
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

    return (
        <div className="p-8 md:p-12 mt-12 mb-8 flex flex-col items-center bg-card/20 backdrop-blur-3xl rounded-2xl border border-border/30 shadow-2xl">
            <div className="mb-8 w-full">
                <h3 className="text-3xl font-semibold text-center tracking-tight">Explore More {type === 'blog' ? 'Articles' : 'Projects'}</h3>
            </div>

            <div className="relative w-full">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-6 lg:-ml-12 z-10 p-3 rounded-full bg-background border border-border shadow-md hover:bg-secondary transition-colors"
                    aria-label="Scroll left"
                >
                    <ArrowLeft size={20} />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-6 lg:-mr-12 z-10 p-3 rounded-full bg-background border border-border shadow-md hover:bg-secondary transition-colors"
                    aria-label="Scroll right"
                >
                    <ArrowRight size={20} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide flex-nowrap w-full px-4 md:px-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.length > 0 ? (
                        items.map((item) => (
                            <Link
                                key={item.slug}
                                to={`${basePath}/${item.slug}`}
                                className="block min-w-[300px] max-w-[350px] p-0 bg-card/10 hover:bg-card/20 border border-border/30 rounded-xl overflow-hidden hover:border-accent/50 transition-colors snap-start shrink-0 group relative"
                            >
                                <div className="relative h-40 w-full overflow-hidden bg-muted/30">
                                    {item.cover ? (
                                        <img
                                            src={item.cover}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                                            <span className="text-neutral-700 text-3xl font-black opacity-30 select-none group-hover:scale-110 transition-transform duration-700">{type.toUpperCase()}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                <div className="p-6">
                                    {item.category && (
                                        <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs rounded mb-3">
                                            {item.category}
                                        </span>
                                    )}
                                    <h4 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="block w-full max-w-md mx-auto p-12 bg-transparent border border-dashed border-border/30 rounded-xl snap-start shrink-0 text-center flex flex-col items-center justify-center">
                            <h4 className="text-xl font-medium mb-3 text-foreground">More {type === 'blog' ? 'Articles' : 'Projects'} Coming Soon!</h4>
                            <p className="text-base text-muted-foreground">Add multiple rows to your Notion database to fill out this carousel.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

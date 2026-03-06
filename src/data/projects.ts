export interface Project {
    slug: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    link?: string;
    github?: string;
}

export const projectsData: Project[] = [
    {
        slug: "smart-traffic-sign-recognition",
        title: "Smart Traffic Sign Recognition for Autonomous Vehicles",
        description:
            "Developed a computer vision pipeline using EfficientNet to detect 50+ road signs. Applied quantization techniques and TensorRT to accelerate inference speed by 3x (60 FPS), enabling real-time processing for autonomous navigation.",
        content: `
### Background
Autonomous vehicles require robust and real-time perception systems to navigate safely. Recognizing traffic signs with high accuracy and low latency is a critical component of this perception stack.

### Architecture
This project implements a state-of-the-art computer vision pipeline utilizing **EfficientNet**. 
1. **Detection & Classification**: The model is trained to classify over 50 different classes of traffic signs under various lighting and weather conditions.
2. **Optimization**: To achieve real-time performance on edge devices, the model was optimized using INT8 Quantization.
3. **Deployment**: Deployed the optimized model using **NVIDIA TensorRT**.

### Results
The TensorRT integration resulted in a massive performance boost, accelerating inference speed by **3x**, achieving a stable **60 FPS** on local hardware, making it viable for real-time vehicular navigation systems.
    `,
        tags: ["Python", "Computer Vision", "EfficientNet", "TensorRT"],
    },
    {
        slug: "findflix-movie-recommendation",
        title: "Findflix Movie Recommendation",
        description:
            "Architected a hybrid recommendation engine using embedding vectors and collaborative filtering; achieved an NDCG score of 0.88 (18% above baseline). Focused on production scalability, optimizing the data loading pipeline for real-time predictions",
        content: `
### The Challenge
Recommending movies to users based on their sparse viewing history is notoriously difficult. Finding the right balance between exploring new genres and exploiting known preferences is key to user retention.

### Technical Approach
Findflix uses a **Hybrid Recommendation Architecture**:
1. **Collaborative Filtering**: Analyzes user-item interaction matrices to find similar users.
2. **Content-Based Filtering via Embeddings**: Utilizes deep learning to generate dense vector embeddings for movies based on their metadata (cast, genre, synopsis).
3. **Vector Database**: Used a vector database to perform high-speed similarity searches (k-NN) on the embeddings to serve real-time recommendations.

### Impact and Scalability
By combining these approaches, the system achieved a Normalized Discounted Cumulative Gain (NDCG) score of **0.88**, which was a significant 18% improvement over the baseline matrix factorization model. 
Furthermore, the data loading pipeline was re-architected to handle real-time prediction scaling, ensuring sub-100ms response times even under load.
    `,
        tags: ["Python", "Machine Learning", "Collaborative Filtering", "Embedding Vectors"],
    },
];

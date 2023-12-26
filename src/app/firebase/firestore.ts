import {
    collection,
    getDocs,
    query,
    where,
    DocumentSnapshot,
    Timestamp,
    getDoc,
    updateDoc,
    doc
} from "firebase/firestore";
import { db } from "./firbaseconfig";

export interface Video {
    id: string;
    user_id: string;
    title: string;
    description: string;
    thumbnail: string;
    video: string;
    tags: string[];
    time: Date;
    photoURL: string;
    channelName: string;
    comments?:any[];
}

export interface Comment {
    commentText: string;
    photoURL: string;
    userName: string;
    timestamp?: any;
}

export async function fetchVideosByUserId(userId: string): Promise<Video[]> {
    const videosCollection = collection(db, "videos");
    const q = query(videosCollection, where("user_id", "==", userId));

    try {
        const querySnapshot = await getDocs(q);
        const videos: Video[] = [];

        querySnapshot.forEach((doc: DocumentSnapshot) => {
            if (doc.exists()) {
                const data = doc.data();
                const video: Video = {
                    id: doc.id,
                    user_id: data['user_id'],
                    title: data['title'],
                    description: data['description'],
                    thumbnail: data['thumbnail'],
                    video: data['video'],
                    tags: data['tag'],
                    time: (data['time'] as Timestamp).toDate(),
                    photoURL: data['photoURL'],
                    channelName: data['channelName'],
                    comments: data['comments'] || [],
                };
                videos.push(video);
            }
        });

        return videos;
    } catch (error) {
        console.error("Error fetching videos: ", error);
        throw error;
    }
}

export async function fetchAllVideos(): Promise<Video[]> {
    const videosCollection = collection(db, "videos");

    try {
        const querySnapshot = await getDocs(videosCollection);
        const videos: Video[] = [];

        querySnapshot.forEach((doc: DocumentSnapshot) => {
            if (doc.exists()) {
                const data = doc.data();
                const video: Video = {
                    id: doc.id,
                    user_id: data['user_id'],
                    title: data['title'],
                    description: data['description'],
                    thumbnail: data['thumbnail'],
                    video: data['video'],
                    tags: data['tag'],
                    time: (data['time'] as Timestamp).toDate(),
                    photoURL: data['photoURL'],
                    channelName: data['channelName'],
                    comments: data['comments'] || [],
                };
                videos.push(video);
            }
        });

        return videos;
    } catch (error) {
        console.error("Error fetching videos: ", error);
        throw error;
    }
}

export async function addComment(comment: Comment, videoId: string): Promise<void> {
    const videoDocument = doc(db, 'videos', videoId);
    try {
        const docSnapshot = await getDoc(videoDocument);
        const existingComments = docSnapshot.data()?.['comments'] || [];
        const newComment = {
            commentText: comment.commentText,
            photoURL: comment.photoURL,
            userName: comment.userName,
            timestamp: new Date(),
        };

        const updatedComments = [newComment, ...existingComments ];

        await updateDoc(videoDocument, {
            comments: updatedComments
        });
    } catch (error) {
        console.error('Error adding comment: ', error);
        throw error;
    }
}

export async function getComments(videoId: string): Promise<Comment[]> {
    const videoDocument = doc(db, 'videos', videoId);
    try {
        const docSnapshot = await getDoc(videoDocument);
        const Comments = docSnapshot.data()?.['comments'] || [];
        return Comments;
    } catch (error) {
        console.error('Error getting comments: ', error);
        throw error;
    }
}
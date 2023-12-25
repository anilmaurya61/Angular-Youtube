import {
    collection,
    getDocs,
    query,
    where,
    DocumentSnapshot,
    Timestamp,
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
}

export async function fetchVideosByUserId(userId: string): Promise<Video[]> {
    const videosCollection = collection(db, "videos");
    const q = query(videosCollection, where("user_id", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      const videos:Video[] = [];

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
                    channelName:data['channelName'],
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
                    channelName:data['channelName'],
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

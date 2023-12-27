import {
    collection,
    getDocs,
    query,
    where,
    DocumentSnapshot,
    Timestamp,
    getDoc,
    updateDoc,
    doc,
    arrayUnion,
    setDoc,
    arrayRemove
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
    comments?: any[];
    likesCount?: number;
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
                    likesCount: data['likesCount']  || 0,
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
                    likesCount: data['likesCount']  || 0,
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

        const updatedComments = [newComment, ...existingComments];

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

export async function addSubscription(channelId: string, userId: string) {
    const subscriptionDocRef = doc(db, 'subscriptions', userId);

    try {
        await setDoc(subscriptionDocRef, {
            channelIds: arrayUnion(channelId),
            timestamp: new Date(),
        }, { merge: true });

        console.log('Subscription added/updated successfully');
    } catch (error) {
        console.error('Error adding/updating subscription: ', error);
    }
}

export async function removeSubscription(channelId: string, userId: string) {
    const subscriptionDocRef = doc(db, 'subscriptions', userId);

    try {
        await setDoc(subscriptionDocRef, {
            channelIds: arrayRemove(channelId),
        }, { merge: true });

        console.log('Subscription removed successfully');
    } catch (error) {
        console.error('Error removing subscription: ', error);
    }
}

export async function getSubscription(userId: string) {
    const subscriptionDocRef = doc(db, 'subscriptions', userId);

    try {
        const docSnapshot = await getDoc(subscriptionDocRef);

        if (docSnapshot.exists()) {
            const subscriptionData = docSnapshot.data();
            console.log('Subscription found: ', subscriptionData);
            return subscriptionData;
        } else {
            console.log('Subscription not found');
            return null;
        }
    } catch (error) {
        console.error('Error getting subscription: ', error);
        return null;
    }
}

export async function addLike(videoId: string, action:string): Promise<void> {
    const videoDocument = doc(db, 'videos', videoId);
    try {
      const docSnapshot = await getDoc(videoDocument);
      let existingLikesCount = docSnapshot.data()?.['likesCount'] || 0;
        if(action == 'like'){
            existingLikesCount = existingLikesCount + 1;
        }
        else{
            existingLikesCount = existingLikesCount - 1;
        }
  
      await updateDoc(videoDocument, {
        likesCount: existingLikesCount
      });
    } catch (error) {
      console.error('Error adding like: ', error);
      throw error;
    }
  }
  
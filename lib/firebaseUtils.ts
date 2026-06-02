import { db } from "@/firebase"; // This connects to your existing firebase.ts file
import { collection, query, getDocs, where } from "firebase/firestore";

export interface DeadlineItem {
  id: string;
  title: string;
  date: string; // Stored as "YYYY-MM-DD"
  type: "Training" | "Event";
}

export async function getUpcomingDeadlines(): Promise<DeadlineItem[]> {
  try {
    const todayStr = new Date().toISOString().split("T"); // "2026-06-01"
    
    // Set a window for 14 days from now
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    const twoWeeksLaterStr = twoWeeksLater.toISOString().split("T");

    const deadlines: DeadlineItem[] = [];

    // 1. Fetch Trainings from your Firebase 'trainings' collection
    const trainingRef = collection(db, "trainings");
    const trainingSnap = await getDocs(trainingRef);
    trainingSnap.forEach((doc) => {
      const data = doc.data();
      if (data.date >= todayStr && data.date <= twoWeeksLaterStr) {
        deadlines.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          type: "Training",
        });
      }
    });

    // 2. Fetch Events from your Firebase 'events' collection
    const eventRef = collection(db, "events");
    const eventSnap = await getDocs(eventRef);
    eventSnap.forEach((doc) => {
      const data = doc.data();
      if (data.date >= todayStr && data.date <= twoWeeksLaterStr) {
        deadlines.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          type: "Event",
        });
      }
    });

    // Sort them so the closest date is at the top
    return deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Error fetching deadlines:", error);
    return [];
  }
}
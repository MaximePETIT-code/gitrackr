import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, updateDoc, setDoc, increment } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBxsLH3xQblXqd7xq_0KG_qYr45o3p9Scc",
    authDomain: "gitrackr.firebaseapp.com",
    projectId: "gitrackr",
    storageBucket: "gitrackr.appspot.com",
    messagingSenderId: "1029344294957",
    appId: "1:1029344294957:web:c5ca5c5d858569e8a260a4",
    measurementId: "G-CZ40D6NHH9"
};

const getUniqueId = () => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        userId = Date.now().toString();
        localStorage.setItem("userId", userId);
    }

    return userId;
};

const updateTopProfile = async (userId, currentPath, visitCount) => {
    const app = initializeApp(firebaseConfig);
    console.log('app', app)
    const db = getFirestore(app);
    console.log('db', db)

    try {
        const topProfileRef = doc(db, 'top_profile', currentPath);
        const docSnapshot = await getDoc(topProfileRef);

        if (docSnapshot.exists()) {
            await updateDoc(topProfileRef, {
                visitCount: increment(visitCount),
            });
        } else {
            await setDoc(topProfileRef, {
                name: 'default',
                image: 'default',
                visitCount,
            });
        }

        console.log(`MAJ "top_profile" for ${userId}`);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la collection "top_profile"', error);
    }
};

export default function TopProfile() {
    const currentPath = window.location.pathname;
    const userId = getUniqueId();

    let visitCount = localStorage.getItem(`visitCount_${userId}_${currentPath}`) || 0;

    const hasVisited = localStorage.getItem(`visited_${userId}_${currentPath}`);

    if (!hasVisited) {
        visitCount = parseInt(visitCount, 10) + 1;

        localStorage.setItem(`visited_${userId}_${currentPath}`, true);
        localStorage.setItem(`visitCount_${userId}_${currentPath}`, visitCount.toString());

        updateTopProfile(userId, currentPath, visitCount);
    } else {
        console.log(`L'utilisateur ${userId} a déjà visité la page ${currentPath}. Nombre total de visites : ${visitCount}`);
    }

    return null;
}

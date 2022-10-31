import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const useFirestore = (collectionName, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    const dbRef = collection(db, collectionName);
    let collectionRef = query(dbRef, orderBy("createAt"));

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = query(
        dbRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        // orderBy("createAt")
      );
    }

    const unsubscribed = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDocument(data);
    });
    return unsubscribed;
  }, [collectionName, condition]);
  return document;
};

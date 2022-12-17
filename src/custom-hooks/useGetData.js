import { useState, useEffect } from 'react'
import { getDocs, collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase.config"

const useGetData = (collectionName) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const collectionRef = collection(db, collectionName)

    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(collectionRef)

            //==========firebase firestore realtime data update

            onSnapshot(collectionRef, snapshot => {

                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            })

        }
        getData()
    }, [])

    return { data, loading }


}


export default useGetData
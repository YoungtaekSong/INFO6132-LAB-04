import { firebaseDB } from '@/database/config'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
} from 'firebase/firestore'

const ROOT = "Book"

export async function getBorrowedList() {
    console.log('GetList...')
    const docsSnap = await onSnapshot(collection(firebaseDB, ROOT), {
        next: (snapshot) => {
            const data: any[] = []
            snapshot.docs.forEach((doc) => {
                data.push({
                    id: doc.data().id,
                    title: doc.data().title,
                    year: doc.data().year,
                    authors: doc.data().authors,
                    cover: doc.data().cover,
                    isbn: doc.data().isbn
                })
            })
            return data
        },
    })
}

export async function getById(id: string | undefined) {
    console.log('Get...')
    console.log(id)
    if (id != undefined) {
        try {
            const docSnap = await getDoc(doc(firebaseDB, ROOT, id))
            if (docSnap.exists()) {
                return true
            }
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    return false
}

export async function save(data: {}) {
    console.log('Save...')
    console.log(data)
    if (data != undefined) {
        try {
            await addDoc(collection(firebaseDB, ROOT), data)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }
}

export async function saveById(id: string | undefined, data: {}) {
    console.log('Save...')

    console.log(data)

    if (id != undefined && data != undefined) {
        try {
            await setDoc(doc(firebaseDB, ROOT, id), data)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }
}

export async function update(id: string, data: {}) {
    console.log('Update...')
    if (data != undefined) {
        try {
            await updateDoc(doc(firebaseDB, ROOT, id), data)
        } catch (e) {
            console.error('Error deleting document: ', e)
        }
    }
}

export async function removeById(id: string | undefined) {
    console.log('Remove...')
    if (id != undefined) {
        try {
            await deleteDoc(doc(firebaseDB, ROOT, id))
        } catch (e) {
            console.error('Error deleting document: ', e)
        }
    }
}

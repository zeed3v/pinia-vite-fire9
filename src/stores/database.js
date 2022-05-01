import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false
    }),
    actions: {
        async getUrls(){

            if(this.documents-length !== 0) {
                return
            }

            this.loadingDoc = true
            try {
                const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    console.log(doc.id, doc.data());
                    this.documents.push({
                        id:doc.id,
                        ...doc.data()
                    })
                })

            } catch (error) {
                console.log(error);
            } finally {
                this.loadingDoc = false
            }
        },
        async addUrl(name) {
            try {
                const objectoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"),objectoDoc)
               //console.log(docRef.id)
               this.documents.push({
                ...objectoDoc,
                id: docRef.id
            })
            } catch (error) {
                console.log(error)
            } finally {

            }
        },
        async leerUrl(id){
            try {
                const docRef = doc(db, "urls", id)
                const docSpan = await getDoc(docRef)

                if(!docSpan.exists()){
                    throw new Error("No existe el documento")
                }

                if(docSpan.data().user !== auth.currentUser.uid){
                    throw new Error("No es su documento")
                }

                return docSpan.data().name
            } catch (error) {
                console.log(error.message)
            } finally {

            }
        },
        async updateUrl(id, name){
            try {
                const docRef = doc(db, "urls", id)

                const docSpan = await getDoc(docRef)
                if(!docSpan.exists()){
                    throw new Error("No existe el documento")
                }

                if(docSpan.data().user !== auth.currentUser.uid){
                    throw new Error("No es su documento")
                }

                await updateDoc(docRef, {
                    name: name,
                })

                this.documents = this.documents.map(item => item.id === id ? ({...item, name: name}) : item)
                router.push('/')
            } catch (error) {
                console.log(error.message)
            } finally {

            }
        },
        async deleteUrl(id){
            try {
                const docRef = doc(db, "urls", id)

                const docSpan = await getDoc(docRef)
                if(!docSpan.exists()){
                    throw new Error("No existe el documento")
                }

                if(docSpan.data().user !== auth.currentUser.uid){
                    throw new Error("No es su documento")
                }

                await deleteDoc(docRef)
                this.documents = this.documents.filter(
                    (item) => item.id !== id
                )
            } catch (error) {
                console.log(error.message)
            } finally {

            }
        }
    }
})
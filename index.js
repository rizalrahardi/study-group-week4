const express = require('express')
const app = express()
let dataKaryaTulis = require('./db/karya_tulis.json')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/v1/karya_tulis', (req, res) => {
    res.status(200).json(dataKaryaTulis)
})

app.get('/api/v1/karya_tulis/:id', (req, res) => {
    const karya_tulis = dataKaryaTulis.find(i => i.id === + req.params.id)
    res.status(200).json(karya_tulis)
})

app.post('/api/v1/karya_tulis', (req,res) => {
    //destructure isi
    const {tema,judul,hasil_nilai,nim,nid} = req.body
    
    //dapat id
    const id = dataKaryaTulis[dataKaryaTulis.length - 1].id +1
    const karya_tulis = {id,tema,judul,hasil_nilai,nim,nid}

    dataKaryaTulis.push(karya_tulis)
    res.status(201).json(dataKaryaTulis)
})

app.put("/api/v1/karya_tulis/:id", (req,res) => {
    const id = req.params.id
    dataKaryaTulis.filter(post => {
        if(post.id == id){
            post.tema = req.body.tema
            post.judul = req.body.judul
            post.hasil_nilai = req.body.hasil_nilai
            post.nim = req.body.nim
            post.nid = req.body.nid
            return post
        }
    })
    res.status(200).json(dataKaryaTulis)
})

app.delete('/api/v1/karya_tulis/:id', (req,res) => {
    dataKaryaTulis = dataKaryaTulis.filter(i => i.id !== +req.params.id)
    res.status(200).json({
        message: `Post dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

app.listen(port, () => {
    console.log('Server Ready')
})
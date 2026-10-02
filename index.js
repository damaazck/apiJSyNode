import express from 'express';
import fs from "fs";

const app = express();

app.use(express.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Bienvenido a mi primer api con Node JS");
});

app.get("/alumnos", (req, res) => {
    const data = readData();
    res.json(data.alumnos);
});

app.get("/alumnos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const alumno = data.alumnos.find((alumno) => alumno.id === id);

    res.json(alumno);
});

app.post("/alumnos", (req, res) => {
    const data = readData();
    const body = req.body;

    const newAlumno = {
        id: data.alumnos.length + 1,
        ...body,
    };

    data.alumnos.push(newAlumno);
    writeData(data);

    res.json(newAlumno);
});

app.put("/alumnos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);

    const alumnoIndex = data.alumnos.findIndex(
        (alumno) => alumno.id === id
    );

    data.alumnos[alumnoIndex] = {
        ...data.alumnos[alumnoIndex],
        ...body,
    };

    writeData(data);

    res.json({ message: "Cambio realizado" });
});

app.delete("/alumnos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const alumnoIndex = data.alumnos.findIndex(
        (alumno) => alumno.id === id
    );

    data.alumnos.splice(alumnoIndex, 1);

    writeData(data);

    res.json({ message: "Alumno eliminado correctamente" });
});

app.listen(3000, () => {
    console.log('Servidor escuchando por el puerto 3000');
});
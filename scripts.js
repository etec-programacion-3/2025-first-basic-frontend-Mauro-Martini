const API_URL = "http://127.0.0.1:8000";

async function listarLibros() {
    try {
        const response = await fetch(`${API_URL}/libros/`);
        if (!response.ok) throw new Error("Error al listar libros");
        const data = await response.json();
        mostrarResultado(data);
    } catch (error) {
        mostrarError(error.message);
    }
}

async function buscarPorTitulo() {
    const titulo = prompt("Ingrese el título a buscar:");
    if (!titulo) return mostrarError("Debe ingresar un título");
    try {
        const response = await fetch(`${API_URL}/libros/buscar/?titulo=${titulo}`);
        if (!response.ok) throw new Error("Error al buscar por título");
        const data = await response.json();
        mostrarResultado(data);
    } catch (error) {
        mostrarError(error.message);
    }
}

async function buscarPorCategoria() {
    const categoria = prompt("Ingrese la categoría a buscar:");
    if (!categoria) return mostrarError("Debe ingresar una categoría");
    try {
        const response = await fetch(`${API_URL}/libros/categoria/?categoria=${categoria}`);
        if (!response.ok) throw new Error("Error al buscar por categoría");
        const data = await response.json();
        mostrarResultado(data);
    } catch (error) {
        mostrarError(error.message);
    }
}

async function crearLibro() {
    const libro = {
        titulo: prompt("Título del libro:"),
        autor: prompt("Autor del libro:"),
        isbn: prompt("ISBN del libro (13 caracteres):"),
        categoria: prompt("Categoría del libro:")
    };
    if (!libro.titulo || !libro.autor || !libro.isbn || !libro.categoria) {
        return mostrarError("Todos los campos son obligatorios");
    }
    try {
        const response = await fetch(`${API_URL}/libros/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(libro)
        });
        if (!response.ok) throw new Error("Error al crear el libro");
        const data = await response.json();
        mostrarResultado(data);
    } catch (error) {
        mostrarError(error.message);
    }
}

async function actualizarLibro() {
    const id = prompt("ID del libro a actualizar:");
    if (!id) return mostrarError("Debe ingresar un ID");
    const datos = {
        titulo: prompt("Nuevo título (dejar vacío para no cambiar):") || undefined,
        autor: prompt("Nuevo autor (dejar vacío para no cambiar):") || undefined,
        isbn: prompt("Nuevo ISBN (dejar vacío para no cambiar):") || undefined,
        categoria: prompt("Nueva categoría (dejar vacío para no cambiar):") || undefined,
        estado: prompt("Nuevo estado (dejar vacío para no cambiar):") || undefined
    };
    try {
        const response = await fetch(`${API_URL}/libros/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        if (!response.ok) throw new Error("Error al actualizar el libro");
        const data = await response.json();
        mostrarResultado(data);
    } catch (error) {
        mostrarError(error.message);
    }
}

async function eliminarLibro() {
    const id = prompt("ID del libro a eliminar:");
    if (!id) return mostrarError("Debe ingresar un ID");
    try {
        const response = await fetch(`${API_URL}/libros/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Error al eliminar el libro");
        const data = await response.json();
        mostrarResultado(data);
    } catch (error) {
        mostrarError(error.message);
    }
}

function mostrarResultado(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function mostrarError(message) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
// Variables globales
let students = [];
let editingStudent = null;
let studentToDelete = null;

// Elementos del DOM
const studentForm = document.getElementById('student-form');
const formTitle = document.getElementById('form-title');
const studentsGrid = document.getElementById('students-grid');
const deleteModal = document.getElementById('delete-modal');
const notification = document.getElementById('notification');
const searchInput = document.getElementById('search-input');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Formulario de estudiante
    studentForm.addEventListener('submit', handleFormSubmit);
    
    // Búsqueda en tiempo real
    searchInput.addEventListener('input', handleSearch);
    
    // Cerrar modal al hacer clic fuera
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeModal();
        }
    });
    
    // Tecla Escape para cerrar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Cargar todos los estudiantes
async function loadStudents() {
    try {
        showLoading();
        const response = await fetch('/api/estudiantes');
        
        if (!response.ok) {
            throw new Error('Error al cargar estudiantes');
        }
        
        students = await response.json();
        displayStudents(students);
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al cargar los estudiantes', 'error');
        studentsGrid.innerHTML = '<p class="error-message">Error al cargar los estudiantes</p>';
    }
}

// Mostrar estudiantes en la interfaz
function displayStudents(studentsToShow) {
    if (studentsToShow.length === 0) {
        studentsGrid.innerHTML = `
            <div class="no-students">
                <i class="fas fa-users" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <p>No hay estudiantes registrados</p>
            </div>
        `;
        return;
    }
    
    studentsGrid.innerHTML = studentsToShow.map(student => `
        <div class="student-card">
            <div class="student-info">
                <h3>${student.nombre} ${student.apellido}</h3>
                <p><i class="fas fa-envelope"></i> ${student.email}</p>
                <p><i class="fas fa-calendar-alt"></i> ${student.edad} años</p>
                <p><i class="fas fa-book"></i> ${student.carrera}</p>
                <p><i class="fas fa-clock"></i> Registrado: ${formatDate(student.fecha_registro)}</p>
            </div>
            <div class="student-actions">
                <button class="btn btn-edit" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-delete" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Mostrar loading
function showLoading() {
    studentsGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Cargando estudiantes...
        </div>
    `;
}

// Manejar envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(studentForm);
    const studentData = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        edad: parseInt(formData.get('edad')),
        carrera: formData.get('carrera')
    };
    
    try {
        let response;
        
        if (editingStudent) {
            // Actualizar estudiante existente
            response = await fetch(`/api/estudiantes/${editingStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData)
            });
        } else {
            // Crear nuevo estudiante
            response = await fetch('/api/estudiantes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData)
            });
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al guardar estudiante');
        }
        
        const result = await response.json();
        
        // Mostrar notificación de éxito
        showNotification(
            editingStudent ? 'Estudiante actualizado exitosamente' : 'Estudiante creado exitosamente',
            'success'
        );
        
        // Limpiar formulario y recargar datos
        cancelForm();
        loadStudents();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification(error.message, 'error');
    }
}

// Editar estudiante
async function editStudent(id) {
    try {
        const response = await fetch(`/api/estudiantes/${id}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar datos del estudiante');
        }
        
        const student = await response.json();
        
        // Llenar el formulario con los datos del estudiante
        document.getElementById('nombre').value = student.nombre;
        document.getElementById('apellido').value = student.apellido;
        document.getElementById('email').value = student.email;
        document.getElementById('edad').value = student.edad;
        document.getElementById('carrera').value = student.carrera;
        
        // Cambiar título del formulario
        formTitle.innerHTML = '<i class="fas fa-user-edit"></i> Editar Estudiante';
        
        // Guardar referencia del estudiante en edición
        editingStudent = student;
        
        // Scroll al formulario
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al cargar datos del estudiante', 'error');
    }
}

// Eliminar estudiante
function deleteStudent(id) {
    studentToDelete = id;
    deleteModal.style.display = 'block';
}

// Confirmar eliminación
async function confirmDelete() {
    if (!studentToDelete) return;
    
    try {
        const response = await fetch(`/api/estudiantes/${studentToDelete}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar estudiante');
        }
        
        showNotification('Estudiante eliminado exitosamente', 'success');
        closeModal();
        loadStudents();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al eliminar estudiante', 'error');
    }
}

// Cerrar modal
function closeModal() {
    deleteModal.style.display = 'none';
    studentToDelete = null;
}

// Cancelar formulario
function cancelForm() {
    studentForm.reset();
    editingStudent = null;
    formTitle.innerHTML = '<i class="fas fa-user-plus"></i> Agregar Nuevo Estudiante';
}

// Buscar estudiantes
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        displayStudents(students);
        return;
    }
    
    const filteredStudents = students.filter(student => 
        student.nombre.toLowerCase().includes(searchTerm) ||
        student.apellido.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.carrera.toLowerCase().includes(searchTerm)
    );
    
    displayStudents(filteredStudents);
}

// Función para buscar estudiantes (botón de búsqueda)
function searchStudents() {
    handleSearch();
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para actualizar la lista (botón actualizar)
function refreshStudents() {
    loadStudents();
}

// Alias para compatibilidad con el HTML
window.loadStudents = loadStudents;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.confirmDelete = confirmDelete;
window.closeModal = closeModal;
window.cancelForm = cancelForm;
window.searchStudents = searchStudents; 
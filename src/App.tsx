import React, { useState } from 'react';
import logo from './logo.svg';
// import  TaskItem  from '../components/TaskItem';
import './App.css';


function MyButton({ title }: { title: string }) {
  return (
    <button className='button'>{title}</button>
  );
} 

const TaskItem = ({ task, onEdit, onDelete } : { task: { id: number, name: string, description: string }, onEdit: (id: number) => void, onDelete: (id: number) => void }) => {
  return (
    <div className="taskitem">
      <div className='titles'>
        <h2>{task.name}</h2>
        <p>{task.description}</p>
      </div>
       
      <div className="taskactions">
        <button onClick={() => onEdit(task.id)}>Modifier</button>
        <button onClick={() => onDelete(task.id)}>Supprimer</button>
      </div>
    </div>
  );
};

export default function MyApp() {
  const [tasks, setTasks] = useState([{ id: 1, name: "Aller manger", description: "Très Vite" }]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);



  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const newTask = { id: Date.now(), name, description };
    setTasks([...tasks, newTask]);
    setName("");
    setDescription("");
  };

  const handleEdit = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className='container'>
      <div className='contain'>
        <h1>My Todos</h1>
        <div className='formdiv'>
          <form className='form' onSubmit={handleAdd}>
            <div className='name'>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder='Entrez votre tâche' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className='description'>
              <label htmlFor="desscription">Description</label>
              <input type="text" placeholder='Entrez la description' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <MyButton title="Ajouter" />
          </form>
        </div>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

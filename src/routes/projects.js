
import express from 'express';
import projectController from '../controllers/projectController.js';
import Project from '../models/project.js';

const projectsRouter = express.Router();

projectsRouter.post('/new', async (req, res) => {
    
    const { name, link, description, img } = req.body;
    const project = new Project( name, link, description, img);
  try {
    await projectController.save(project);
    res.status(201).send('Projeto salvo com sucesso!');
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao salvar projeto');
  }
});

  projectsRouter.get('/', projectController.getAll);


  projectsRouter.get('/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await projectController.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }
      return res.json(project);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar projeto', error });
    }
  });

  projectsRouter.put('/:id/update', projectController.update);
  projectsRouter.delete('/:id/delete', projectController.deleteProject);

export default projectsRouter;



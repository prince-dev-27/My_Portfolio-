const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload, uploadImageToCloud, deleteImageFromCloud } = require('../utils/upload');

// Helper to parse technologies whether sent as JSON string, array, or comma-separated
const parseTechnologies = (techs) => {
  if (!techs) return [];
  if (Array.isArray(techs)) return techs;
  try {
    const parsed = JSON.parse(techs);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    if (typeof techs === 'string') {
      return techs.split(',').map(t => t.trim()).filter(Boolean);
    }
  }
  return [];
};

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create project (Admin only) with Multer handling
router.post('/', auth, (req, res) => {
  upload.single('image')(req, res, async (uploadErr) => {
    if (uploadErr) {
      if (uploadErr.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ success: false, message: 'File size exceeds the 5 MB limit.' });
      }
      return res.status(400).json({ success: false, message: uploadErr.message });
    }

    try {
      let imageUrl = req.body.imageUrl;
      let imagePublicId = null;

      if (req.file) {
        const uploadResult = await uploadImageToCloud(req.file, req);
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      }

      const projectData = {
        title: req.body.title,
        description: req.body.description,
        longDescription: req.body.longDescription,
        category: req.body.category || 'Full Stack',
        technologies: parseTechnologies(req.body.technologies),
        imageUrl: imageUrl || undefined,
        imagePublicId,
        githubUrl: req.body.githubUrl,
        liveUrl: req.body.liveUrl,
        featured: req.body.featured === 'true' || req.body.featured === true,
        order: req.body.order ? Number(req.body.order) : 0
      };

      const newProject = new Project(projectData);
      const savedProject = await newProject.save();
      res.status(201).json({ success: true, data: savedProject });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
});

// Update project (Admin only)
router.put('/:id', auth, (req, res) => {
  upload.single('image')(req, res, async (uploadErr) => {
    if (uploadErr) {
      if (uploadErr.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ success: false, message: 'File size exceeds the 5 MB limit.' });
      }
      return res.status(400).json({ success: false, message: uploadErr.message });
    }

    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      let imageUrl = req.body.imageUrl !== undefined ? req.body.imageUrl : project.imageUrl;
      let imagePublicId = project.imagePublicId;

      if (req.file) {
        // Upload new image
        const uploadResult = await uploadImageToCloud(req.file, req);
        // Delete old image if exists
        if (project.imagePublicId || project.imageUrl) {
          await deleteImageFromCloud(project.imagePublicId, project.imageUrl);
        }
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      } else if (req.body.imageUrl === '' || req.body.imageUrl === null) {
        // Explicitly removed image
        if (project.imagePublicId || project.imageUrl) {
          await deleteImageFromCloud(project.imagePublicId, project.imageUrl);
        }
        imageUrl = '';
        imagePublicId = null;
      }

      const updateData = {
        title: req.body.title !== undefined ? req.body.title : project.title,
        description: req.body.description !== undefined ? req.body.description : project.description,
        longDescription: req.body.longDescription !== undefined ? req.body.longDescription : project.longDescription,
        category: req.body.category !== undefined ? req.body.category : project.category,
        technologies: req.body.technologies !== undefined ? parseTechnologies(req.body.technologies) : project.technologies,
        imageUrl,
        imagePublicId,
        githubUrl: req.body.githubUrl !== undefined ? req.body.githubUrl : project.githubUrl,
        liveUrl: req.body.liveUrl !== undefined ? req.body.liveUrl : project.liveUrl,
        featured: req.body.featured !== undefined ? (req.body.featured === 'true' || req.body.featured === true) : project.featured,
        order: req.body.order !== undefined ? Number(req.body.order) : project.order
      };

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({ success: true, data: updatedProject });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
});

// Delete project (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    if (deletedProject.imagePublicId || deletedProject.imageUrl) {
      await deleteImageFromCloud(deletedProject.imagePublicId, deletedProject.imageUrl);
    }
    res.json({ success: true, message: 'Project removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

const handleRequest = require("../utils/request");
const issueModel = require('./../models/issues');
const projectModel = require('../models/projects');
const memberModel = require('../models/members');
  
  /**
   * Get all members
   */
  const getMembers = handleRequest(async (req,res) => {
    const data = await memberModel.find();
    return (data);
});

/**
 * Get all issues
 */
const getIssues = handleRequest(async (req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      const data = await issueModel.find();
      console.log('data',data);
      return data;
  })
  
  /**
   * Get all projects
   */
  const getProjects = handleRequest(async () => {
      console.log('hERE');
      const data = await projectModel.find();
      console.log('Projects', projects.json());
      return data;
  });
  
  /**
   * Post methods
   * Add new issue
   */
  const postIssuesById = handleRequest((req, res) => {
    const data = new issueModel({
      projectname: req.body.projectname,
      type: req.body.type,
      assignee: req.body.assignee,
      title: req.body.title,
      summary: req.body.summary,
      status: req.body.status,
      priority: req.body.priority,
      description: req.body.description,
      storypoint: req.body.storypoint,
    });
      const dataToSave = data.save();
      return dataToSave;
  });
  
  /**
   * Add new member
   */
  const postMembers = handleRequest(async(req,res) => {
    console.log('req', req);
    let parsedData = (req);
    const data = new memberModel({
      name: parsedData.name,
      projects: parsedData.projects,
    });
      const dataToSave = data.save();
      return dataToSave;
  });
  
  /**
   * Add new project
   */
  const postProjectsById = handleRequest((req, res) => {
    const data = new projectModel({
      name: req.body.name,
      description: req.body.description,
      members: req.body.members,
    });
    try {
      const dataToSave = data.save();
      return dataToSave;
    } catch (error) {
     return error.message
    }
  });
  
  /***
   * Edit issue by id
   */
  
  const editIssueById = handleRequest(async (req, res) => {
    try {
      const id = mongoose.Types.ObjectId(req.params.id);
      console.log(id);
      const updatedData = req.body;
      console.log(updatedData);
      const options = { new: true };
      const result = await issueModel.findByIdAndUpdate(id, updatedData, options);
      console.log(result);
      res.send(result);
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  /**
   * Starts with
   */
  const getIssueStartedWith = handleRequest(async (req, res) => {
    try {
      const data = await issueModel.find();
      const filterData = await data.filter((d) =>
        d.title.toLowerCase().startsWith(req.params.data.toLowerCase())
      );
      res.json(filterData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  /**
   * Get members that include member names
   */
  const getIncludeMember = handleRequest(async (req, res) => {
    try {
      const data = await  memberModel.find();
      const list = req.body.data;
      let filteredData = [];
      for(let i=0;i<list.length;i++){
        for(let j=0;j<data.length;j++){
         if(data[j].name.includes(list[i])){
           filteredData.push(data[j]);
         }
        }
      }
      filteredData = filteredData.length>0? filteredData: data;
      res.json(filteredData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  /**
   * Delete issue by id
   */
 const deleteIssuesById = handleRequest(async(req,res)=> {
    try{
          const id = req.params.id;
          const data = await issueModel.findByIdAndDelete(id)
          res.send(`Issue with title ${data.title} has been deleted..`)
    }
    catch(e){
      res.status(500).json({message: error.message});
    }
  });

  module.exports = {
    getIssues,
    getMembers,
    getProjects,
    postIssuesById,
    getIncludeMember,
    getIssueStartedWith,
    deleteIssuesById,
    editIssueById,
    postMembers,
    postProjectsById
  }
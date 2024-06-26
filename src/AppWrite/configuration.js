// To use the Environment Variables
import config from "../Config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    Client = new Client();
    Databases
    Storage

    constructor() {
        this.Client.setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectID);
        this.Databases = new Databases(this.Client);
        this.Storage = new Storage(this.Client);
    }

    // For providing unique ID we use the Slug 
    createPost=async({Title,Slug,Content,Image,Status,User_Id})=>{
        try{
            return await this.Databases.createDocument(config.AppWriteDatabaseID,config.AppWriteCollectionID,Slug,{Title,Content,Image,Status,User_Id});
        }
        catch(err)
        {
            throw new Error(err);
        }
    }

    updatePost=async(slug,{Title,Content,Image,Status})=>{
        try{
            await this.Databases.updateDocument(config.AppWriteDatabaseID,config.AppWriteCollectionID,slug,
                {
                    Title,
                    Content,
                    Image,
                    Status
                }
            )
        }
        catch(err)
        {
            throw new Error(err);
        }
    }

    deletePost=async(slug)=>{
        try{
             await this.Databases.deleteDocument(config.AppWriteDatabaseID,config.AppWriteCollectionID,slug);
             return true;
        }
        catch(err)
        {
            return false;
        }
    }

    getPost=async(Slug)=>{
        try{
            return await this.Databases.getDocument(config.AppWriteDatabaseID,config.AppWriteCollectionID,Slug);
        }
        catch(err)
        {
            throw new Error(err);
        }
    }

    getPosts=async(queries=[Query.equal("Status","active")])=>{
        try{
            return await this.Databases.listDocuments(config.AppWriteDatabaseID,config.AppWriteCollectionID,queries
            )
        }
        catch(err)
        {
            return false;
        }
    }

    async uploadFile(file)
    {
        try{
            return await this.Storage.createFile(
                config.AppWriteBucketID,
                ID.unique(),
                file

            )
        }
        catch(err)
        {
            throw new Error(err);
        }
    }

    async DeleteFile(fileID)
    {
        try{
            await this.Storage.deleteFile(config.AppWriteBucketID,fileID);
            return true;
        }
        catch(err)
        {
            return false;
        }
    }

    getFilePreview=(fileID)=>{
        return this.Storage.getFilePreview(config.AppWriteBucketID,fileID);
    }


}

const myService = new Service();

export default myService;   
"use strict";
let request = require("request");

module.exports = app => {
    let errorFormatter = app.helpers.errorFormatter;
    let logger = app.helpers.logger;
    let Media = app.models.media;
    let like = app.models.like;
    let comment = app.models.comment;

    function fetchAllMedia (params) {
        var filters = {department:{}, skills:{}}
        if(params.dept_filters){
            filters.department
        }
        if(params.genre_filters){
            filters.tags
        }
        if(params.skills_filters){
            filters.department
        }
        if(params.media_type){
            filters.department
        }
        var length = 0;
        var LikesPromise;
        var CommentsPromise;
        return new Promise((resolve, reject) => {
            Media.getLatestMedia(filters).then(function(data){
                if(data){
                        data.forEach(function(mediadata){                                    
                                        like.getLikesForMedia(mediadata.id).then((likes)=>{
                                            mediadata.likes=likes;
                                        });

                                        comment.getCommentsForMedia(mediadata.id).then((comments)=>{
                                            mediadata.comments=comments;
                                            length++;
                                            if(length == data.length){
                                                resolvedata();
                                            }
                                        });
                                    
                                    /*getCommentsForMedia(mediadata.id).then((comments)=>{
                                        mediadata.comments=comments;
                                        if(length == data.length){
                                            resolvedata();
                                        }
                                    });*/

                                });

                        function resolvedata(){
                            resolve(data);
                        }
                }
            });
        });
    }

    function fetchAllMediaDetailsByProjectId (projectId) {
        var length = 0;
        var LikesPromise;
        var CommentsPromise;
        return new Promise((resolve, reject) => {
            Media.fetchAllMediaDetailsByProjectId(projectId).then(function(data){
                if(data){
                        data.forEach(function(mediadata){                                    
                                        like.getLikesForMedia(mediadata.id).then((likes)=>{
                                            mediadata.likes=likes;
                                        });

                                        comment.getCommentsForMedia(mediadata.id).then((comments)=>{
                                            mediadata.comments=comments;
                                            length++;
                                            if(length == data.length){
                                                resolvedata();
                                            }
                                        });
                                    
                                    /*getCommentsForMedia(mediadata.id).then((comments)=>{
                                        mediadata.comments=comments;
                                        if(length == data.length){
                                            resolvedata();
                                        }
                                    });*/

                                });

                        function resolvedata(){
                            resolve(data);
                        }
                }
            });
        });
    }

    function uploadImages(images,projectId,userId){
        var objects = [];
        images.forEach(function(image){
            objects.push({work_id:projectId, user_id:userId, media_type:'image', link:image.url});
        });
        return new Promise((resolve,reject)=>{
            Media.uploadImages(objects, projectId).then((data)=>{
                return resolve(data);
            })
        })        
    }


    function uploadBlog(blog,projectId,userId){
        var object = {work_id:projectId, user_id:userId, media_type:'blog', link:null, blog:blog};

        return new Promise((resolve,reject)=>{
            Media.uploadBlog(object, projectId).then((data)=>{
                return resolve(true);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getAllMediaForProject(projectId){
        return new Promise((resolve,reject)=>{
            Media.getAllMediaForProject(projectId).then((media)=>{
                return resolve(media);
            })
        })
    }

    function deleteMediaByWorkId(projectId, userId){
        return new Promise((resolve,reject)=>{
            Media.deleteMediaByWorkId(projectId, userId).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }


    function uploadYoutube(projectId,userId, youtubeId){
        var object = {work_id:projectId, user_id:userId, media_type:'youtube', link:youtubeId};
        return new Promise((resolve,reject)=>{
            Media.uploadYoutube(object, projectId).then((data)=>{
                return resolve(true);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function uploadSoundcloud(projectId,userId, soundcloudId){
        var object = {work_id:projectId, user_id:userId, media_type:'soundcloud', link:soundcloudId};
        return new Promise((resolve,reject)=>{
            Media.uploadSoundcloud(object, projectId).then((data)=>{
                return resolve(true);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getMediaByUserIdProjectIdAndMediaId(userId, projectId, mediaId){
        return new Promise((resolve, reject)=>{
            Media.getMediaByUserIdProjectIdAndMediaId(userId, projectId, mediaId).then(data=>{
                console.log("working in mefdia");
                console.log(data);
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function updateMediaBlog(userId,projectId,mediaId,blog){
        return new Promise((resolve,reject)=>{
            Media.updateMediaBlog(userId,projectId,mediaId,blog).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function deleteMediaById(mediaId, userId){
        return new Promise((resolve,reject)=>{
            console.log("working in service");
            Media.deleteMediaById(mediaId, userId).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    return {
        fetchAllMedia,
        uploadImages,
        getAllMediaForProject,
        uploadBlog,
        deleteMediaByWorkId,
        uploadYoutube,
        uploadSoundcloud,
        getMediaByUserIdProjectIdAndMediaId,
        updateMediaBlog,
        fetchAllMediaDetailsByProjectId,
        deleteMediaById
    };
};
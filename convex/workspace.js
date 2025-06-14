import {
    mutation,
    query
} from "./_generated/server";
import {
    v
} from "convex/values";

export const CreateWorkspace = mutation({
    args: {
        messages: v.any(),
        user: v.id('users')
    },
    handler: async (ctx, args) => {
        const WorkSpaceId = await ctx.db.insert('workspace', {
            messages: args.messages,
            user: args.user
        });
        return WorkSpaceId;
    }

})

// Function to get workspace data including messages
export const GetWorkspace = query({
    args: {
        WorkSpaceId: v.id("workspace"),
    },
    handler: async (ctx, args) => {
        // Fetch the workspace data based on the provided ID
        const result = await ctx.db.get(args.WorkSpaceId);
        return result;
    }
})

export const UpdateMessages = mutation({
    args:{
        WorkSpaceId:v.id("workspace"),
        messages:v.any()
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.patch(args.WorkSpaceId,{
            messages:args.messages
        });
        return result;
    }
})

export const UpdateFiles = mutation({
    args:{
        WorkSpaceId:v.id("workspace"),
        files:v.any()
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.patch(args.WorkSpaceId,{
            fillData:args.files
        });
        return result;
    }
})

// export const GetAllWorkspace= query({
//     args:{
//         userId:v.id("users")
//     },
//     handler:async(ctx,args)=>{
//         const result = await ctx.db.query('workspace').filter(q=>q.eq(q.field('user'),args.userId)).collect();
        
//         return result;
//     }
// })


export const GetAllWorkspace=query({
    args:{
        userId:v.id('users')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.query('workspace').filter(q=>q.eq(q.field('user'),args.userId)).collect();
        return result;
    }
})
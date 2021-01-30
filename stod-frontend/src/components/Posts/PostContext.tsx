import * as React from "react";

import { IPost } from "../../actions/types";

//defining the context types
interface Context{
    selectedPost: IPost | null;
    setSelectedPost: (post: IPost | null) => void;
}

const PostContext = React.createContext({} as Context);


//returns the values currently in the context
export const usePostContext = () =>{
    return React.useContext(PostContext);

}

//
  interface Props{
      children: React.ReactNode;
  }

//   const PostContextProvider: React.FC = ({ children }) => {
const PostContextProvider: React.FC<Props> = ({children}) => {
    const [selectedPost, setSelectedPost] = React.useState<IPost | null>(null);

    // const setSelection = (post: IPost | null) => {
    //     setSelectedPost(post);
    // }


    //value is the values that I want to give to the components
    const value: Context = {
        selectedPost,
        setSelectedPost,
    }

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
import * as React from "react";
import { Props } from "react";
import { IPost, IRootState } from "../../actions/types";


const PostContext = React.createContext(null);

export const usePostContext = () =>
  React.useContext(PostContext);

//   const PostContextProvider: React.FC = ({ children }) => {
const PostContextProvider: React.FC<Props> = ({children}) => {
    const [selectedPost, setSelectedPost] = React.useState<IPost | null>(null);

    const setSelection = (post: IPost | null) => {
        setSelectedPost(post);
    }

    return (
        {children}
    );
};

export default PostContextProvider;
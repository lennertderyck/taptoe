import { useContext } from "react";
import { helpContext } from "../contexts/HelpContext";
import { localArticles } from "../data/faq/local";

const useHelp = () => {
    const values = useContext(helpContext);    
    
    const {
        openState: [ opened, setOpen ],
        articleState: [ article, setArticle ],
    } = values;
    
    const findLocalArticle = (articleId) => {
        const articleResult = localArticles.find(article => article.id === articleId);
        return articleResult;
    };
    
    const toggleHelp = () => setOpen(!opened);
    const closeHelp = () => setOpen(false);
    
    /**
     * 
     * @param {string} helpArticleID 
     * @param {boolean} isLocal 
     */
    const openHelp = (helpArticleID, isLocal = false) => {
        setOpen(true)
        setArticle(isLocal ? findLocalArticle(helpArticleID) : { id: helpArticleID })
    };
    const selectArticle = (helpArticle) => {
        setArticle(helpArticle)
    }
    
    /**
     * 
     * @param {string} helpArticleID 
     */
    const selectLocalArticle = (helpArticleID) => {
        const localArticleResult = localArticles.find(article => article.id === helpArticleID)
        setArticle(localArticleResult)
    }
    
    return {
        isOpen: opened,
        active: article?.id ? true : false,
        currentArticle: article,
        toggleHelp,
        closeHelp,
        openHelp,
        selectArticle,
        selectLocalArticle
    }
}

export default useHelp;
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useHelp } from '../../hooks';
import Aside from './Aside';
import Fade from 'react-reveal/Fade'
import { Button, Contentainer, Icon } from '..';
import { localArticles } from '../../data/faq/local';
import classname from 'classnames';
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Backdrop = tw.div`
    fixed top-0 left-0 right-0 bottom-0
    z-40
    bg-black
    bg-opacity-25
`;

const HelpSidebar = () => {
    const { isOpen, closeHelp, currentArticle, active, selectArticle, selectLocalArticle } = useHelp()
    const [state, setState] = useState(true)
    
    return (
        <>
            <Aside open={ isOpen }>
                <div className="bg-white h-full rounded-xl shadow-lg overflow-scroll flex flex-col">
                    <div className="flex items-center justify-between pl-8 pr-6 py-6 border-b-2 border-gray-200 sticky top-0 bg-white">
                        <h2 className="text-2xl font-display lowercase">
                            Help
                        </h2>
                        <div className="flex">
                            {
                                active && 
                                <button 
                                    onClick={() => selectArticle()} 
                                    className="py-2 pl-3 pr-4 hover:bg-gray-100 rounded-xl"
                                >
                                    <Icon name="arrow-left" className="mr-2 inline" color="currentColor" />
                                    <span className="font-display lowercase">Overzicht</span>
                                </button>
                            }
                            <button onClick={ closeHelp } className="py-2 px-4 hover:bg-gray-100 text-gray-500 rounded-xl">
                                <span className="font-display lowercase">sluiten</span>
                                <Icon name="close" size="1.4rem" color="currentColor" className="inline ml-2" />
                            </button>
                        </div>
                    </div>
                    { active && (
                        <>
                            <div className="p-8 flex-1">
                                <h4 className="text-2xl font-semibold text-tt-emerald-700 mb-4">{ currentArticle.title }</h4>
                                <Contentainer innerHtml={ currentArticle.content } />
                            </div>
                            <div className="p-8">
                                { currentArticle.relatedArticles?.length > 0 && <>
                                    <h3 className="text-xl font-medium font-display lowercase mb-4">gerelateerde vragen</h3>
                                    <div>
                                        { currentArticle.relatedArticles.map((articleId, index) => {
                                            const articleResult = localArticles.find(article => article.id === articleId)
                                            
                                            return (
                                                <div
                                                    className="border-t-2 first:border-t-0 border-gray-200 py-4 px-3 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => selectLocalArticle(articleId)}
                                                >
                                                    <h4 className="font-display lowercase">{ articleResult.title }</h4>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>}
                            </div>
                        </>
                    )}
                    { !active && <div className="w-full p-8">
                        <h4 className="text-2xl font-medium font-display lowercase mb-4">Voorgestelde vragen</h4>
                        <div>
                            { localArticles?.map((article, index) => (
                                <div 
                                    className="border-b-2 last:border-b-0 border-gray-200 py-4 px-3 cursor-pointer hover:bg-gray-100"
                                    onClick={() => selectArticle(article)}
                                >
                                    <h4 className="font-display lowercase">{ article.title }</h4>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </Aside>
            <Fade when={ isOpen } collapse delay={ 0 } duration={ 300 }> 
                <Backdrop onClick={() => closeHelp()} />
            </Fade>
        </>
    )
}

export default HelpSidebar
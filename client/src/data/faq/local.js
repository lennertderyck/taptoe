const articleGroups = [
    {
        id: 'rfj343FSD',
        name: 'Algemeen',
    }
]

const localArticles = [
    {
        id: 'faq-local-1',
        title: 'Waarom duurt het laden soms zo lang?',
        content: `
            <p>
                Door een beperkt budget bij de opstart van dit project zijn we genoodzaakt om gebruik te maken van diensten met goedkopen abonnementen.
            </p>
            <p>
                Hierdoor moet onze server bijvoorbeeld even "opwarmen" en kan het een minuutje duren om de pagina in te laden als ons platform een tijdje niet gebruikt.
            </p>
            <p>
                Maar bij regelmatig gebruik blijft de server actief en zal de website dus altijd snel laden.
            </p>
        `,
        relatedArticles: ['faq-local-2', 'faq-local-3'],
        articleGroups: ['rfj343FSD']
    },
    {
        id: 'faq-local-2',
        title: 'Is taptoe wel volledig gratis?',
        content: `
            <p>Kortgezegd, ja!</p>
            <p>In de huidige vorm zal Taptoe altijd gratis blijven. Het is de bedoeling dat ons platform toegankelijk blijft voor elke iedereen, ongeacht hun budget.</p>
            <p>Het is op termijn wel de bedoeling om inkomsten te genereren zodat we de ontwikkeling (serverkosten, integraties, etc.) kunnen blijven steunen. In welke vorm dit zal zijn, of wanneer dit er aan komt is voor nu nog onbekend.</p>
            <p>Het is wel onze bedoeling om zo veel mogelijk functies gratis of zo goedkoop mogelijk aan te bieden. Echte winst maken is geen doel, breakeven worden op termijn wel.</p>
        `,
        relatedArticles: ['faq-local-1', 'faq-local-3'],
        articleGroups: ['rfj343FSD']
    },
    {
        id: 'faq-local-3',
        title: 'Verificatie - wat en hoe?',
        content: `
            <p>Om misbruik en dergelijke te voorkomen hebben we een systeem geïmplementeerd waarbij groepen en locatie geverifieerd worden alvorens het label te krijgen.</p>
            <p>Dit kan op verscheidene manieren. Doordat wij de groep kennen, door in persoon de locatie te gaan bezoeken, door de recenties, ...</p>
            <p>Ben je een groep of persoon met goeie bedoelingen en wil je geverifieerd worden? Dan is de kans zeer groot dat dat zal gebeuren. Contacteer ons gewoon en wij laten je weten welke stappen je moet doorloppen. Met een duidelijke website ben je meestal binnen de werkdag geverifieerd!</p>
            <p>Locaties kunnen afzonderlijk geverifieerd worden. De verificatie van een tribe resulteert echter wel automatisch in de verificatie van al hun locaties.</p>
        `,
        relatedArticles: ['faq-local-1', 'faq-local-2'],
        articleGroups: ['rfj343FSD']
    },
    
]

export {
    localArticles
}
const matrixOptions = ['E9', 'FF', '7A', 'BD', '55', '1C']

const matrix = document.querySelector('.matrix')



/* Function to create the new node elements */
const populateMatrix = (nodeId) =>
{
    let newNode = document.createElement('div')
    newNode.setAttribute('class', 'matrix-node')
    newNode.classList.add(nodeId)
    
    /* Choosing one of the possible text options randomly */
    newNode.textContent = matrixOptions[Math.floor(Math.random() * 6)]

    matrix.append(newNode)
}


/* Populating 6x6 matrix of nodes */

for(let i = 0; i < 36; i++) populateMatrix(`node${i}`)


/* Assigning matrix nodes their respective rows 
and columns as classes */

let iter = 0

for(let r = 0; r < 6; r++)
{
    for(let c = 0; c < 6; c++)
    {
        let curr = document.querySelector(`.node${iter}`)
        
        curr.classList.add(`row${r}`)
        curr.classList.add(`col${c}`)
        
        iter++
    }
}    


/* Initializing the first row of nodes to be active
 * and next active line to be vertical */

const row0 = document.querySelectorAll('.row0')
row0.forEach(e => e.classList.add('active'))
let NEXTACTIVE = 'vertical'
let STOP = false


// while (!STOP)
// {
    console.log(`nextactive = ${NEXTACTIVE}`)
    const activeNodes = document.querySelectorAll('.active')
    
    
    /* if last active nodes were in a row, change to col */

    if(NEXTACTIVE === 'horizontal') 
    { 
        // console.log(`  DBG: inside NEXTACTIVE-horizontal`)
        
        /* Regex to check for the entirety of row */
        const rowReg = /^(row)/g
        

        /* Setting the next-active class to all elements of the row
         * where the mouse is hovering  */
        
        activeNodes.forEach(el => 
            el.addEventListener('mouseover', (e) => 
            {
                console.log(e.target.textContent)
                
                const elClassList = e.target.classList.toString().split(' ')
                console.log(`classList: ${elClassList}`)

                /* getting the col#id class (entire column of currently hovered element) */
                const rowNro = elClassList.find(x => rowReg.exec(x))
                console.log(`rowNro = ${rowNro}`)
                
                const rows = document.querySelectorAll(rowNro)
                // TODO: add .next-active
                // TODO: remove existing .active
            })
        )
            NEXTACTIVE = 'vertical'
            
            
        /* if last active nodes were in a column, change to row */
        } else if(NEXTACTIVE === 'vertical') 
        { 
            // console.log(`  DBG: inside NEXTACTIVE-vertical`)
            
            const colReg = /^(col)/g


            // Setting the next-active class to all elements of the column
            // where the mouse is hovering 

            activeNodes.forEach(el => 
                el.addEventListener('mouseover', (e) => 
                {
                    console.log(e.target.textContent)
    
                    const elClassList = e.target.classList.toString().split(' ')
                    console.log(`classList: ${elClassList}`)

                    /* getting the row#id class (entire row of currently hovered element) */
                    const colNro = elClassList.find(x => colReg.exec(x))
                    console.log(`colNro = ${colNro}`) 

                    const cols = document.querySelectorAll(colNro)
                    // TODO: add .next-active
                    // TODO: remove existing .active
                })
            )
        
        NEXTACTIVE = 'horizontal'
    }
    

    for (node of activeNodes)
    {
        node.addEventListener('click', (e) => 
        {
            if (activeNodes.length === 3) STOP = true

            console.log(`   DBG: inside click eventListener`)

            e.target.classList.add('selected')

        })
    }
    
    // activeNodes.forEach(child => 
    //     child.addEventListener('click', (e) => 
    //     {
    //         if (activeNodes.length === 3) STOP = true
            
    //         console.log(`  DBG: inside click eventListener`)
            
    //         // 
    //         e.target.classList.add('selected')
            
    //         // Removing the earlier active nodes (i.e. last active row/column)
            
    //         // document.querySelectorAll('.active')
    //         // .forEach(e => e.classList.remove('active'))
        
        
        
    //         e.target.classList.add('active')
    //     })
    // )
// }
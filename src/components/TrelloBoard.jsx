import React, { useState, useRef } from 'react';

const initData = [
  { title: 'To Do', items: ['one'] },
  { title: 'In Progress', items: ['four'] },
  { title: 'QA', items: ['six', 'seven'] },
  { title: 'Done', items: [] }
]
const TrelloBoard = () => {
  const [list, setList] = useState(initData);
  const [isDragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const [newCard, setNewCard] = useState();

  // ------------------- action: drag and drop card -------------------
  const handleDragStart = (e, params) => {
    dragItem.current = params; // React ref
    dragNode.current = e.target; // DOM node to lower unpredictability
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setDragging(true);
  }

  const handleDragEnter = (e, params) => {
    // when start dragging, all items need to listen 
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList(prevList => {
        let newList = JSON.parse(JSON.stringify(prevList));
        // flip the first, without removing anything, with the second
        newList[params.columnIndex].items.splice(
          params.itemIndex, 0, newList[currentItem.columnIndex].items.splice(
            currentItem.itemIndex, 1
          )[0]
        )
        dragItem.current = params
        return newList;
      })
    }
  }

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null;
    dragNode.current = null
  }

  const handleDragStyle = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.columnIndex === params.columnIndex &&
      currentItem.itemIndex === params.itemIndex
    ) {
      return 'current dnd-item'
    } else {
      return 'dnd-item'
    }
  }

  // ------------------- action: add card -------------------
  const handleAddCard = (e, columnIndex) => {
    console.log('handleAddCard: ', columnIndex)
  }
  const confirmAddCard = (e, columnIndex) => {
    console.log('confirmAddCard: ', columnIndex)
    setList(prevList => {
      let newList = JSON.parse(JSON.stringify(prevList));
      newList[columnIndex].items.push(newCard)
      return newList
    })
  }

  return (
    <div className={'board-wrapper'}>
      {list.map((column, columnIndex) => (
        <main
          onDragEnter={isDragging && !column.items.length ? (e) => handleDragEnter(e, { columnIndex, itemIndex: 0 }) : null}
          key={column.title}
          className='dnd-column'
        >
          <section>
            <div className='column-title'>
              {column.title}
            </div>
            {column.items.map((item, itemIndex) => (
              <div
                draggable
                onDragStart={(e) => { handleDragStart(e, { columnIndex, itemIndex }) }}
                onDragEnter={isDragging ? (e) => { handleDragEnter(e, { columnIndex, itemIndex }) } : null}
                key={item}
                className={isDragging ? handleDragStyle({ columnIndex, itemIndex }) : 'dnd-item'}
              >
                {item}
              </div>
            ))}
            <div className={'add-card__wrapper'}>
              <input
                onChange={(e) => setNewCard(e.target.value)}
                placeholder='Enter a title for this card...”'
                className={'add-card__input'} />
              <div className={'add-card__actions'}>
                <button onClick={(e) => { confirmAddCard(e, columnIndex) }} className={'add-card__confirm'}>
                  Add Card
                </button>
                <button className={'add-card__cancel'}>
                  X
                </button>
              </div>
            </div>
          </section>
          <section onClick={(e) => { handleAddCard(e, columnIndex) }} className={'button__add-card-wrapper'}>
            <button
              key={columnIndex}
              className={'button__add-card'}>
              + Add another card
            </button>
          </section>
        </main>
      ))}
    </div>
  )
}

export default TrelloBoard;

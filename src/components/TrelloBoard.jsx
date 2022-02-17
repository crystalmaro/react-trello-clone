import React, { useState, useRef } from 'react';

const initData = [
  { title: 'To Do', items: ['Pay rent'], isAddBoxShown: false, newItem: '' },
  { title: 'In Progress', items: ['Organize closet', 'Juice cleanse'], isAddBoxShown: false, newItem: '' },
  { title: 'QA', items: ['Write new year resolution'], isAddBoxShown: false, newItem: '' },
  { title: 'Done', items: ['Call mom'], isAddBoxShown: false, newItem: '' }
]
const TrelloBoard = () => {
  const [list, setList] = useState(initData);
  const [isDragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

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
  const handleAddCardDisplay = (e, columnIndex, boolean) => {
    setList(prevList => {
      let newList = JSON.parse(JSON.stringify(prevList));
      newList.map(x => x.isAddBoxShown = false);
      newList[columnIndex].isAddBoxShown = boolean ? true : false;
      newList[columnIndex].newItem = boolean ? undefined : '';
      return newList;
    })
  }
  const handleSubmitNewCard = (e, columnIndex) => {
    e.preventDefault();
    if (list[columnIndex].newItem === '') {
      alert(`Please enter a title before adding a card for ${list[columnIndex].title}.`);
      return;
    }
    setList(prevList => {
      let newList = JSON.parse(JSON.stringify(prevList));
      newList[columnIndex].items.push(newList[columnIndex].newItem)
      newList[columnIndex].newItem = ''
      return newList
    })
  }
  const handleTextareaChange = (e, columnIndex) => {
    setList(prevList => {
      let newList = JSON.parse(JSON.stringify(prevList));
      newList[columnIndex].newItem = e.target.value;
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
            <form
              onSubmit={(e) => { handleSubmitNewCard(e, columnIndex) }}
              style={{ display: column.isAddBoxShown ? 'flex' : 'none' }}
              className={'add-card__wrapper'}
            >
              <textarea
                onChange={(e) => handleTextareaChange(e, columnIndex)}
                type={'text'}
                ref={textarea => textarea && textarea.focus()}
                value={column.newItem}
                placeholder='Enter a title for this card...'
                className={'add-card__textarea'} />
              <div className={'add-card__actions'}>
                <button type={'submit'} className={'add-card__submit'}>
                  Add Card
                </button>
                <button type={'button'} onClick={(e) => { handleAddCardDisplay(e, columnIndex, false) }} className={'add-card__cancel'}>
                  ✕
                </button>
              </div>
            </form>
          </section>
          <section onClick={(e) => { handleAddCardDisplay(e, columnIndex, true) }} className={'button__add-card-wrapper'}>
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

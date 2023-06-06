// shows a list of pins

function PinList(){

  return (
    <section id="pinList">
      <div>
        {
          pins.map(pin =>
            <PinCard key={pin.title} pin={pin}/>)
        }
      </div>
    </section>
  )
}

export default PinList;
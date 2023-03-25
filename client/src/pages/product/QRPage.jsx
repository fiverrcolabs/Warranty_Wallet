import QRComponent from '../../components/QRComponent';


function QRPage() {

  return (
    <div className=" mainContainer container">
      <div className='firstContainer container'>

        <h1 className='px-3'>QR for item name</h1>

        <div className='QRContainer' >
          <QRComponent />
          <QRComponent />
          <QRComponent />
          <QRComponent />
          <QRComponent />
          <QRComponent />
          <QRComponent />
          <QRComponent />
        </div>
      </div>
  

    </div>

  )
}

export default QRPage
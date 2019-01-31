import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const customStyles = {
    content : {
        height                : 450,
        width                 : 600,
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
  }

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 1200,
            addClass: false,
            timer: null,
            disabledButton: false,
            showModal: false
        };
        this.incrementMinutes = this.increaseMinutes.bind(this);
        this.decreaseMinutes = this.decreaseMinutes.bind(this);
        this.toggleAndStart = this.toggleAndStart.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.closeModalAndRestart = this.closeModalAndRestart.bind(this);
        this.closeModalAndFiveMinutesBreak = this.closeModalAndFiveMinutesBreak.bind(this);
        this.closeModalAndThirtyMinutesBreak = this.closeModalAndThirtyMinutesBreak.bind(this);
    }
    toggleAndStart() {
        this.setState({addClass: !this.state.addClass});
        this.setState({disabledButton: !this.state.disabledButton});
        if (this.state.addClass == false    ) {
            let timerSeconds = this.setState({timer: setInterval(()=>{
                if (this.state.seconds>0) {
                    this.setState({seconds: this.state.seconds - 1});
                }else{
                    clearInterval(timerSeconds);
                    this.setState({showModal: true});
                    this.setState({addClass: !this.state.addClass});
                    this.setState({disabledButton: !this.state.disabledButton});
                    clearInterval(this.state.timer);
                    this.setState({seconds: this.state.seconds = 1200});
                }
            },1000)})
        }else{
            clearInterval(this.state.timer)
            this.setState({seconds: this.state.seconds = 1200})
        }
    }
    formatSecondsInHourAndMinutes(seconds) {
        let hour = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let sec = Math.floor((seconds % 3600) % 60);    
        // return hour +':'+minutes+':'+sec;

        if (sec < 10) {
            sec = `0${sec}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (hour < 10) {
            hour = `0${hour}`;
        }
        

        return `${hour}:${minutes}:${sec}`
    }
    increaseMinutes() {
        this.setState({seconds: this.state.seconds + 60});
    }
    decreaseMinutes() {
        this.setState({seconds: this.state.seconds - 60});
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    closeModalAndRestart() {
        this.handleCloseModal()
        this.toggleAndStart()
    }
    closeModalAndFiveMinutesBreak() {
        this.handleCloseModal()
        this.setState({seconds: this.state.seconds = 300})
        this.toggleAndStart();

    }
    closeModalAndThirtyMinutesBreak() {
        this.handleCloseModal()
        this.setState({seconds: this.state.seconds = 1800})
        this.toggleAndStart();

    }
    render() {
        let buttonClassName = this.state.addClass ? 'fas fa-ban' : 'fas fa-play';
        return  <div className="container">
                    <Modal isOpen={this.state.showModal} style={customStyles}>
                        <h2 className="card-header-title is-centered">Break Time !</h2>
                        <button id="modalButton1" className="card-footer-item" onClick={this.closeModalAndRestart}>Restart</button>
                        <button id="modalButton2" className="card-footer-item" onClick={this.handleCloseModal}>Dismiss</button>
                        <button id="modalButton3" className="card-footer-item" onClick={this.closeModalAndFiveMinutesBreak}>Break : 5 min</button>
                        <button id="modalButton4" className="card-footer-item" onClick={this.closeModalAndThirtyMinutesBreak}>Break : 30 min</button>
                        <img className="breakImg" src={require("../img/Break.png")}></img>
                    </Modal>
                <div className="card">
                    <header className="card-header">
                        <h2 className="card-header-title is-centered">Galaxy Timer</h2>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            {this.formatSecondsInHourAndMinutes(this.state.seconds)}
                        </div>
                    </div>
                    <footer className="card-footer">
                        <button className="card-footer-item" disabled={this.state.disabledButton} onClick={this.decreaseMinutes}><i className="fas fa-minus"></i></button>
                        <button className="card-footer-item" onClick={this.toggleAndStart}><i className={buttonClassName}></i></button>
                        <button className="card-footer-item" disabled={this.state.disabledButton} onClick={this.incrementMinutes}><i className="fas fa-plus"></i></button>
                    </footer>
                </div>
                </div>
    }
}

export default Timer
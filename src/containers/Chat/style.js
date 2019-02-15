const style = {
    input: {
        position: 'fixed',
        width: '100%',
        bottom: 0
    },
    msgMine: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 10,
        margin: '10px 0'
    },
    msgHis: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        margin: '10px 0'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    },
    msgCard: {
        minHeight: 35,
        boxSizing: 'border-box',
        padding: '7px 10px',
        background: 'white',
        // textAlign: 'center',
        maxWidth: '100%',
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        overflow: 'hidden',
        borderRadius: 5,
        boxShadow: '0 0 5px rgba(136,136,136,0.2)',
        fontSize: 15
    },
    sendResumeBox: {
        position: 'fixed',
        bottom: 55,
        right: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    btnResume: {
        background: 'white',
        padding: '7px 10px',
        borderRadius: 5,
        boxShadow: '0 0 5px rgba(136,136,136,0.2)',
        marginRight: 0,
        transition: '0.5s'
    }
}

export default style
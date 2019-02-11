const style = {
    navbar: {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1
    },
    container: {
        background: 'white',
        padding: '0 20px',
        marginTop: '45px',
        marginBottom: 50
    },
    innerContainerBasic: {
        /* display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', */
        // borderBottom: '1px solid rgba(136,136,136,0.2)',
        paddingTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dataInformation: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '70px',
        boxSizing: 'border-box',
        padding: '5px 0'
    },
    avatar: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        // border: '3px solid #28a2fa'
    },
    icon_mobileAndEmail: {
        width: '17px',
        height: '17px',
        marginRight: '5px'
    },
    font_mobileAndEmail: {
        color: '#888888',
        display: 'flex',
        marginRight: '15px',
        alignItems: 'center'
    },
    container_me: {
        display: 'flex',
        borderBottom: '1px solid rgba(136,136,136,0.2)',
        paddingBottom: '10px'
    },
    containerTitle: {
        position: 'relative',
        marginBottom: '10px'
    },
    title: {
        fontSize: '18px'
    },
    jobName: {
        fontSize: '16px',
        fontWeight: 'bold'
    },
    itemName: {
        fontSize: '16px',
        fontWeight: 'bold',
        width: '60%'
    },
    datetime: {
        color: '#888888',

    },
    salary: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#108ee9'
    },
    position: {
        // fontSize: '16px',
        marginTop: '10px'
    },
    content: {
        fontFamily: 'Microsoft YaHei',
        color: '#888888'
    },
    containerJob: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    circle: {
        display: 'inline-block',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: '#108ee9',
        position: 'absolute',
        left: -12,
        top: 8
    },
    containerCommon: {
        paddingTop: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(136,136,136,0.2)'
    },
    btnBox: {
        position: 'fixed',
        width: '100%',
        height: 50,
        bottom: 0,
        background: 'rgba(255,255,255,0.8)',
        padding: '5px 10px',
        boxSizing: 'border-box'
    },
    button: {
        height: 40,
        fontSize: 16,
        lineHeight: 2.5
    }
}
export default style
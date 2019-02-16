const style = {
    header: {
        width: '100%',
        height: '130px',
        background: '#108ee9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0 20px',
        paddingTop: '30px'
    },
    avatar: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        border: '3px solid #28a2fa'
    },
    nickname: {
        color: 'white',
        paddingTop: '20px',
    },
    navbar: {
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: '2'
    },
    bgTap: {
        background: '#ddd'
    },
    jobListItem: {
        background: 'white',
        padding: '10px 20px',
        // marginBottom: '10px',
        transition: '.1s'
    },
    NameAndMoney: {
        // marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    jobName: {
        fontSize: '18px',
        fontWeight: 'bold'
    },
    jobMoney: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#108ee9'
    },
    tagContainer: {
        display: 'flex'
    },
    jobTags: {
        color: 'rgb(136,136,136)',
        backgroundColor: 'rgba(136,136,136,0.2)',
        display: 'inline-block',
        fontSize: '13px',
        marginRight: '10px',
        padding: '3px 5px',
        borderRadius: '5px',
        marginTop: 10
    },
    address: {
        maxWidth: '130px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}
export default style
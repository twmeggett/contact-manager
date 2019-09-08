import { toast } from '../shared/Toast';

const baseRequest = (request) => (props, successCB, errorCB) => {
    request(props)
        .then((res) => {
            if (successCB) {
                successCB(res);
            }
            toast.success('Success');
            console.log(res);
        })
        .catch(function(error) {
            const msg = `Error-${error.code}: ${error.message}`;
            if (errorCB) {
                errorCB(msg);
            }
            toast.error(error.message);
            console.log(msg);
        });
};

export const getUser = () => window.firebase.auth().currentUser;

export const createUser = baseRequest(
    (user) => window.firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
);

export const signInUser = baseRequest(
    (creds) => window.firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
);

export const createGroup = baseRequest(
    (group) => {
        const uid = getUser().uid;
        const newPostKey = window.firebase.database().ref('user-data/' + uid).push().key;
        return window.firebase.database().ref().update({
            ['/user-data/' + uid + '/' + newPostKey]: group,
        })
    }
);

export const updateGroup = baseRequest(
    ({groupId, group}) => {
        const uid = getUser().uid;
        return window.firebase.database().ref().update({
            ['user-data/' + uid + '/' + groupId]: group,
        })
    }
);

export const createContact = baseRequest(
    ({groupId, contact}) => {
        const uid = getUser().uid;
        const newPostKey = window.firebase.database().ref('user-data/' + uid + '/' + groupId + '/contacts').push().key;
        return window.firebase.database().ref().update({
            ['user-data/' + uid + '/' + groupId + '/contacts/' + newPostKey]: contact,
        })
    }
);

export const updateContact = baseRequest(
    ({groupId, contactId, contact}) => {
        const uid = getUser().uid;
        return window.firebase.database().ref().update({
            ['user-data/' + uid + '/' + groupId + '/contacts/' + contactId]: contact,
        })
    }
);

export const deleteContact = baseRequest(
    ({groupId, contactId, contact}) => {
        const uid = getUser().uid;
        return window.firebase.database().ref('user-data/' + uid + '/' + groupId + '/contacts/' + contactId).remove();
    }
)

export const signOutUser = baseRequest(
    () => window.firebase.auth().signOut()
)
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
const userDataPath = () => '/user-data/' + getUser().uid;
const groupDataPath = (groupId) => userDataPath() + '/' + groupId;
const contactPath = (groupId) => userDataPath() + '/' + groupId + '/contacts';
const groupRef = (groupId) => window.firebase.database().ref(groupDataPath(groupId));
const contactRef= (groupId, contactId) => window.firebase.database().ref(contactPath(groupId) + '/' + contactId);
const newGroupKey = () => window.firebase.database().ref(userDataPath()).push().key;
const newContactKey = () => window.firebase.database().ref(contactPath()).push().key;

export const getUser = () => window.firebase.auth().currentUser;

export const createUser = baseRequest(
    (user) => window.firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
);

export const signInUser = baseRequest(
    (creds) => window.firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
);

export const createGroup = baseRequest(
    (group) => {
        return groupRef(newGroupKey()).update(group);
    }
);

export const updateGroup = baseRequest(
    async ({groupId, group}) => {
        const ref = groupRef(groupId);
        const groupSnapshot = await ref.once('value');
        ref.update({...groupSnapshot.val(), ...group});
    }
);

export const createContact = baseRequest(
    ({groupId, contact}) => contactRef(groupId, newContactKey()).update(contact)
);

export const updateContact = baseRequest(
    async ({groupId, contactId, contact}) => {
        const ref = contactRef(groupId, contactId);
        const contactSnapshot = await ref.once('value');
        ref.update({...contactSnapshot.val(), ...contact});
    }
);

export const deleteContact = baseRequest(
    ({groupId, contactId}) => contactRef(groupId, contactId).remove()
);

export const deleteGroup = baseRequest(
    ({groupId}) => groupRef(groupId).remove()
)

export const signOutUser = baseRequest(
    () => window.firebase.auth().signOut()
)
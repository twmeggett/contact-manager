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

export const signOutUser = baseRequest(
    () => window.firebase.auth().signOut()
)
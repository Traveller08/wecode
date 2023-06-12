import bcrypt from 'bcrypt';

const generateHash = async(password) =>{
    return await bcrypt.hash(password,10);
};

const compareHash = async (password, hashedPassword) =>{
    const res=await bcrypt.compare(password, hashedPassword);
    const p1=await generateHash(password);
    return res;
};

export {generateHash, compareHash};
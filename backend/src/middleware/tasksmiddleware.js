const validateTaskFields = (request, response, next) => {
    const { title, status } = request.body;

    // Verificar se o campo title está presente e não é vazio
    if (title === undefined || title.trim() === '') {
        return response.status(400).json({ message: "O campo 'title' é obrigatório e não pode ser vazio." });
    }

    // Verificar se o campo status está presente e não é vazio
    if (status === undefined || status.trim() === '') {
        return response.status(400).json({ message: "O campo 'status' é obrigatório e não pode ser vazio." });
    }

    next();
};

module.exports = {
    validateTaskFields
};

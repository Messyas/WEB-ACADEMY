const signup = async (req: Request, res: Response) => {
 const usuario = req.body as SignUpDto;
 try {
 if (await buscaUsuarioPorEmail(usuario.email))
 return res
 .status(400)
 .json({ msg: 'Email informado já está sendo usado' });
 const newUsuario = await createUsuario({
 ...usuario,
 tipoUsuarioId: TiposUsuarios.CLIENT,
 });
 res.status(201).json(newUsuario);
 } catch (e: any) {
 res.status(500).json(e.errors);
 }
};
export default function Apresentacao_cadastro() {
    return (
        <section class="row g-3 pt-5 pe-4" name="Apresentação do Banco de Dados" style={{ marginTop: '0px', paddingTop: '0px !important' }}>
						
						<div class="container col-12 pt-4 pe-1" name="Introdução">
							<h1 class="text_t">Cadastro no Banco</h1>
				
							<p class="text_p justify">A ASSC mantém um banco de pessoas relacionadas à instituição. Fazendo parte dele, 
							você poderá receber informações sobre eventos, oportunidades de trabalho e muito mais. No caso de
							<b>Associados</b> e <b>profissionais</b> vinculados à instituição, o controle desses dados é essecial para a validação
							dessas experiências.
							
							Todos podem se cadastrar dentro de uma das 3 categorias disponíveis:
							</p>
						</div>
						
						<div class="container col-12 pt-4 pe-1" name="Tradutor">
							
							<h2 class="text_t2"> <i class="fa-solid fa-hands-asl-interpreting"></i> Intérprete ou Tradutor</h2>
							<p class="text_c rounded p-2 justify" id="bg1">
								Participando do banco, você poderá receber
								em seu e-mail oportunidades profissionais bem
								como estar sujeito à indicação para terceiros 
								através da associação.
							</p>
						</div>
						
						<div class="container col-12 pt-4 pe-1" name="Associado">
						
							<h2 class="text_t2"> <i class="fa-solid fa-ear-deaf"></i> Associado</h2>
							<p class="text_c rounded p-2 justify" id="bg2">
							Fazendo parte da ASSC e se inscrevendo no sistema, você 
								poderá ficar por dentro das atividades da instituição e dos 
								eventos organizados e indicados por nós.
							</p>
						</div>
							
						<div class="container col-12 pt-4 pb-5 pe-1" name="Voluntário">
							
							<h2 class="text_t2"> <i class="fa-solid fa-handshake-angle"></i> Voluntário</h2>
							<p class="text_c rounded p-2" id="bg3">
							Se dispondo através do banco de voluntários, você terá a
								oportunidade de ajudar a ASSC em suas atividades e eventos, assim
								como receber informações sobre oportunidades de voluntariado externas.
							</p>
						</div>
						</section>
    )
}
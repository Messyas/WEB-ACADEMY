import streamlit as st
import pandas as pd
import plotly.express as px

# Carregar o dataset
try:
    df = pd.read_csv('usuarios_limpo.csv')
    df['data_cadastro'] = pd.to_datetime(df['data_cadastro'])
except FileNotFoundError:
    st.error("Arquivo 'usuarios_limpo.csv' não encontrado. Por favor, execute a célula de geração de dados sintéticos e salve o arquivo.")
    st.stop() # Parar a execução do Streamlit se o arquivo não for encontrado

# Adicionar um título com st.title()
st.title("Dashboard de Análise de Usuários")

# Adicionar um texto de introdução com st.write() ou st.markdown()
st.markdown("""
Este dashboard interativo permite explorar o perfil dos nossos usuários,
sua distribuição geográfica e a evolução dos cadastros ao longo do tempo.
Utilize os filtros na barra lateral para análises mais detalhadas.
""")

# import streamlit as st # Remova o comentário se estiver usando no app.py

# Garantir que df_filtrado está disponível para este exemplo:
df_filtrado = df.copy() # Usar o df_loaded do exemplo de carregamento

# Gráfico de barras: Distribuição de Usuários por Estado
#st.subheader("Distribuição de Usuários por Estado") # No app.py
usuarios_por_estado = df_filtrado['estado'].value_counts().reset_index()
usuarios_por_estado.columns = ['Estado', 'Número de Usuários']

fig_estado = px.bar(
    usuarios_por_estado,
    x='Estado',
    y='Número de Usuários',
    title='Distribuição de Usuários por Estado Selecionado',
    color='Número de Usuários', # Adiciona cor baseada no número de usuários
    color_continuous_scale=px.colors.sequential.Plasma # Escala de cores
)

fig_estado.show()
#st.plotly_chart(fig_estado, use_container_width=True)
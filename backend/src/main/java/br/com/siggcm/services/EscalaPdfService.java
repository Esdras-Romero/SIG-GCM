package br.com.siggcm.services;

import br.com.siggcm.repositories.EscalaRepository;
import br.com.siggcm.repositories.projections.EscalaPdfProjection;

import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.List; 
import java.io.ByteArrayOutputStream;

import com.lowagie.text.Document;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Font; 
import com.lowagie.text.Element; 
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class EscalaPdfService {

    private final EscalaRepository repository;

    public EscalaPdfService(EscalaRepository repository) {
        this.repository = repository;
    }

    public byte[] gerar(UUID escalaId) {
        List<EscalaPdfProjection> dados = repository.buscarDadosPdf(escalaId);

        if (dados.isEmpty()) {
            throw new RuntimeException("Escala não encontrada.");
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            Document document = new Document(PageSize.A4.rotate());
            PdfWriter.getInstance(document, baos);
            document.open();

            // Pega o primeiro registro para preencher as informações gerais do cabeçalho
            adicionarCabecalho(document, dados.get(0));
            
            // CORRIGIDO: Passando a lógica da tabela para dentro de seu respectivo método
            adicionarTabela(document, dados);
            
            adicionarRodape(document);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void adicionarCabecalho(Document document, EscalaPdfProjection escala) throws Exception {
        Font titulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

        Paragraph p = new Paragraph("ESCALA DE SERVIÇO", titulo);
        p.setAlignment(Element.ALIGN_CENTER);
        document.add(p);

        document.add(new Paragraph(" "));

        document.add(new Paragraph("Posto: " + escala.getPosto()));
        document.add(new Paragraph("Escala: " + escala.getTipoEscala()));
        document.add(new Paragraph("Período: " + escala.getMes() + "/" + escala.getAno()));

        document.add(new Paragraph(" "));
    }

    // CORRIGIDO: Declaração correta do método que estava quebrado gerando erro de token
    private void adicionarTabela(Document document, List<EscalaPdfProjection> dados) throws Exception {
        PdfPTable tabela = new PdfPTable(5);
        tabela.setWidthPercentage(100);

        // Cabeçalhos da tabela
        tabela.addCell("Data");
        tabela.addCell("Grupo");
        tabela.addCell("Turno");
        tabela.addCell("Horário");
        tabela.addCell("Guarda");

        // Linhas de dados
        for (EscalaPdfProjection item : dados) {
            tabela.addCell(item.getData() != null ? item.getData().toString() : "");
            tabela.addCell(item.getGrupo());
            tabela.addCell(item.getTurno());
            tabela.addCell(item.getHoraInicio() + " - " + item.getHoraFim());
            tabela.addCell(item.getGuarda());
        }

        document.add(tabela);
    }

    // CORRIGIDO: Criado o método que estava faltando para resolver o erro "undefined"
    private void adicionarRodape(Document document) throws Exception {
        document.add(new Paragraph(" "));
        Font fonteRodape = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 9);
        Paragraph rodape = new Paragraph("Documento gerado automaticamente pelo Sistema SIGGCM.", fonteRodape);
        rodape.setAlignment(Element.ALIGN_CENTER);
        document.add(rodape);
    }
}
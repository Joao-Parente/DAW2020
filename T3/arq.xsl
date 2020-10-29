<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0"> 

    <xsl:template match="/">
        <xsl:result-document href="site/index.html"> 
        
        <html>
            <head>
                <title>Arqueossítios</title>
            </head>
            <body>
                <h2>Arqueossítios</h2>
                <h3> Índice</h3>
                <ol>
                    <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>

                        </xsl:apply-templates>
                </ol>
            </body>
        </html>
        
        </xsl:result-document>
       
        <xsl:apply-templates/>
        
        
        
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
      
        <li>  <a name="{generate-id()}" /><a href="arqelem/{generate-id()}.html" ><xsl:value-of select="IDENTI"/></a></li>
    </xsl:template>
        
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="site/arqelem/{generate-id()}.html">
            
            <html>
                <head>
                    <title> <xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    
                    
                    <p><b>IDENTI </b>    <xsl:apply-templates  select="IDENTI"/></p>
                    <p><b>DESCRI </b>    <xsl:apply-templates  select="DESCRI"/></p>
                    <p><b>CRONO </b>    <xsl:apply-templates  select="CRONO"/></p>      
                    <p><b>LUGAR </b>    <xsl:apply-templates  select="LUGAR"/></p>
                    
                    <p><b>FREGUE </b>    <xsl:apply-templates  select="FREGUE"/></p>
                    <p><b>CONCEL </b>    <xsl:apply-templates  select="CONCEL"/></p>
                    <p><b>CODADM </b>    <xsl:apply-templates  select="CODADM"/></p>
                    <p><b>LATITU </b>    <xsl:apply-templates  select="LATITU"/></p>      
                    <p><b>LONGIT </b>    <xsl:apply-templates  select="LONGIT"/></p>
                    
                    <p><b>ALTITU </b>   <xsl:apply-templates  select="ALTITU"/></p>
                    <p><b>ACESSO </b>    <xsl:apply-templates select="ACESSO"/></p>      
                    <p><b>DESARQ </b>    <xsl:apply-templates  select="DESARQ"/></p>
                    
                    <p><b>INTERE </b>    <xsl:apply-templates select="INTERP"/></p>
                    <p><b>BIBLIO </b>   <xsl:apply-templates  select="BIBLIO"/></p>      
                    <p><b>AUTOR </b>    <xsl:apply-templates  select="AUTOR"/></p>
                    <p><b>DATA </b>   <xsl:apply-templates select="DATA"/></p>
                    
                    <address> 
                        [ <a href="../index.html#{generate-id()}" >Voltar ao Indice</a>]</address>
                    
                    
                </body>
            </html>
            
        </xsl:result-document>
        
    </xsl:template>
    
    <xsl:template match="LIGA ">
        <span style="color:blue"><xsl:value-of select="."/></span>
    </xsl:template>
    
    <xsl:template match="BIBLIO ">
        <p> <xsl:value-of select="."/> </p>
    </xsl:template>
    
    


</xsl:stylesheet>
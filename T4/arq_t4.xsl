<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            
            <html>
                <head>
                    <title></title>
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
        <xsl:apply-templates select="//ARQELEM"/>
    </xsl:template>
    
    <xsl:template  match="ARQELEM" mode="indice">
        <li>  <a name="{position()}" /><a href="{position()}.html" ><xsl:value-of select="IDENTI"/></a></li>   
    </xsl:template>
            
    
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="site/{position()}.html">
            
            <html>
                <head>
                    <title> <xsl:value-of select="TIPO"/></title>
                </head>
                <body>
                    <h2>
                        <xsl:value-of select="TIPO"/>
                    </h2>
                    <dl>
                        <xsl:for-each select="*">
                            <dt>
                                <xsl:value-of select="name(.)"/>
                            </dt>
                            <dd>
                                <xsl:value-of select="."/>
                            </dd>

                        </xsl:for-each>

                    </dl>
                    <address> [<a href="index.html#{position()}">Voltar ao indice</a>]</address>
                    <xsl:if test="not(position()=1)"> <address> [<a href="{position()-1}.html">Anterior</a>]</address></xsl:if>
                    <xsl:if test="not(position()=count(//ARQELEM))"><address> [<a href="{position()+1}.html">Proximo</a>]</address></xsl:if>
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
        
</xsl:stylesheet>
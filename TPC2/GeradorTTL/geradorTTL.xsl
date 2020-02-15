<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="text"/>
    
    
    
    <xsl:template match="obra">
        ###  http://www.semanticweb.org/bosch/ontologies/2020/1/arquivo-musical#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        <xsl:if test="instrumentos/instrumento">
        :éTocadaPor <xsl:for-each select="instrumentos/instrumento">
            <xsl:choose>
                <xsl:when test="position()!=last()" >
                    <xsl:for-each select="partitura">
                        :<xsl:value-of select="@voz"/><xsl:value-of select="@type"/><xsl:value-of select="@path"/>,
                    </xsl:for-each> 
                </xsl:when>
                <xsl:when test="position()=last() " >
                    <xsl:for-each select="partitura">
                        <xsl:choose>
                            <xsl:when test="position()!=last() " >
                                :<xsl:value-of select="@voz"/><xsl:value-of select="@type"/><xsl:value-of select="@path"/>, 
                            </xsl:when>
                            <xsl:when test="position()=last()" >
                                :<xsl:value-of select="@voz"/><xsl:value-of select="@type"/><xsl:value-of select="@path"/>;
                            </xsl:when>
                        </xsl:choose>
                    </xsl:for-each> 
                </xsl:when>
            </xsl:choose>              
        </xsl:for-each>
        </xsl:if>
        <xsl:if test="compositor">
        :compositor "<xsl:value-of select="compositor"/>" ;
        </xsl:if>
        <xsl:if test="tipo">
        :tipo "<xsl:value-of select="tipo"/>" ;
        </xsl:if>
        <xsl:if test="titulo">
        :titulo "<xsl:value-of select="titulo"/>" .
        </xsl:if>
        
       
        
        <xsl:apply-templates select="instrumento"/>  
        
    </xsl:template>
    
    <xsl:template match="instrumento">
        ###  http://www.semanticweb.org/bosch/ontologies/2020/1/arquivo-musical#<xsl:value-of select="partitura/@voz"/><xsl:value-of select="partitura/@type"/><xsl:value-of select="partitura/@path"/>
        :<xsl:value-of select="partitura/@voz"/><xsl:value-of select="partitura/@type"/><xsl:value-of select="partitura/@path"/> rdf:type owl:NamedIndividual ,
        :Instrumento ;
        :partitura "<xsl:value-of select="designacao"/>"^^xsd:string .
    </xsl:template>
    
</xsl:stylesheet>
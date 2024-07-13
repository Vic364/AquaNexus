import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor {
  type Cultivo = {
    idCultivo: Nat;
    humedad: Nat;
    presion: Nat;
    estado: Text;
  };

  type LogCultivo = {
    idLog: Nat;
    idCultivo: Nat;
    fechaRiego: Text;
    surco: Nat;
    detalles: Text;
  };

  type LogDetalle = {
    idCultivo: Nat;
    fechaRiego: Text;
    estado: Text;
    presion: Nat;
    humedad: Nat;
    surco: Nat;
    idLog: Nat;
    detalles: Text;
  };

  type Alerta = {
    idAlerta: Nat;
    idCultivo: Nat;
    informacion: Text;
  };

  type AlertaDetalle = {
    idAlerta: Nat;
    idCultivo: Nat;
    informacion: Text;
  };

  var cultivos = HashMap.HashMap<Nat, Cultivo>(10, Nat.equal, Hash.hash);
  var logs = HashMap.HashMap<Nat, LogCultivo>(10, Nat.equal, Hash.hash);
  var alertas = HashMap.HashMap<Nat, Alerta>(10, Nat.equal, Hash.hash);

  public shared func agregarCultivo(cultivo: Cultivo) : async () {
    cultivos.put(cultivo.idCultivo, cultivo);
  };

  public shared func obtenerCultivos() : async [Cultivo] {
    return Iter.toArray(cultivos.vals());
  };

  public shared func actualizarCultivo(cultivoAct: Cultivo) : async Bool {
    switch (cultivos.get(cultivoAct.idCultivo)) {
      case (null) { return false; };
      case (_) {
        cultivos.put(cultivoAct.idCultivo, cultivoAct);
        return true;
      };
    };
  };

  public shared func eliminarCultivo(idCultivo: Nat) : async Text {
    switch (cultivos.remove(idCultivo)) {
      case (null) { return "Cultivo no encontrado."; };
      case (_) { return "Cultivo eliminado exitosamente."; };
    };
  };
  
  public shared func agregarLog(log: LogCultivo) : async () {
    logs.put(log.idLog, log);
  };
  
  public shared func obtenerLogs() : async [LogCultivo] {
    return Iter.toArray(logs.vals());
  };

  public shared func eliminarLogs(idLog: Nat) : async Text {
    switch (logs.remove(idLog)) {
      case (null) { return "Log no encontrado."; };
      case (_) { return "Log eliminado exitosamente."; };
    };
  };

  public shared func obtenerLogsConDetalles() : async [LogDetalle] {
    return Iter.toArray(
      Iter.map(logs.vals(), func(log: LogCultivo) : LogDetalle {
        switch (cultivos.get(log.idCultivo)) {
          case (?cultivo) {
            return {
              idCultivo = log.idCultivo;
              fechaRiego = log.fechaRiego;
              estado = cultivo.estado;
              presion = cultivo.presion;
              humedad = cultivo.humedad;
              surco = log.surco;
              idLog = log.idLog;
              detalles = log.detalles;
            };
          };
          case (null) {
            return {
              idCultivo = log.idCultivo;
              fechaRiego = log.fechaRiego;
              estado = "Cultivo no encontrado";
              presion = 0;
              humedad = 0;
              surco = log.surco;
              idLog = log.idLog;
              detalles = log.detalles;
            };
          };
        }
      })
    );
  };

  public shared func agregarAlerta(alerta: Alerta) : async () {
    alertas.put(alerta.idAlerta, alerta);
  };

  public shared func obtenerAlertas() : async [Alerta] {
    return Iter.toArray(alertas.vals());
  };

  public shared func obtenerAlertasConDetalles() : async [Text] {
    return Iter.toArray(
      Iter.map(alertas.vals(), func(alerta: Alerta) : Text {
        switch (cultivos.get(alerta.idCultivo)) {
          case (?cultivo) {
            return "idAlerta: " # Nat.toText(alerta.idAlerta) # ", idCultivo: " # Nat.toText(alerta.idCultivo) # ", informacion: " # alerta.informacion # " (Estado: " # cultivo.estado # ", Presion: " # Nat.toText(cultivo.presion) # ", Humedad: " # Nat.toText(cultivo.humedad) # ")";
          };
          case (null) {
            return "idAlerta: " # Nat.toText(alerta.idAlerta) # ", idCultivo: " # Nat.toText(alerta.idCultivo) # ", informacion: " # alerta.informacion # " (Cultivo no encontrado)";
          };
        }
      })
    );
  };
};
